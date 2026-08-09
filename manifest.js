const fs = require('fs/promises')
const os = require('os')
const path = require('path')
const { createHash } = require('crypto')
const { parseArgs } = require('util')

const SEPARATOR = Buffer.from([0])
const PATH_SEPARATOR = '\x01'

function compareStrings(left, right) {
    const leftChars = Array.from(left)
    const rightChars = Array.from(right)
    const length = Math.min(leftChars.length, rightChars.length)

    for (let index = 0; index < length; index += 1) {
        const difference = leftChars[index].codePointAt(0) - rightChars[index].codePointAt(0)
        if (difference !== 0) return difference
    }

    return leftChars.length - rightChars.length
}

function* traverse(obj) {
    const entries = Object.entries(obj).sort(([left], [right]) => compareStrings(left, right))

    for (const [key, value] of entries) {
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            for (const [subPath, subValue] of traverse(value)) {
                yield [`${key}${PATH_SEPARATOR}${subPath}`, subValue]
            }
        } else {
            yield [key, value]
        }
    }
}

function objHash(obj) {
    const md5 = createHash('md5')

    for (const [key, value] of traverse(obj)) {
        md5.update(key, 'utf8')
        md5.update(SEPARATOR)
        md5.update(value, 'utf8')
        md5.update(SEPARATOR)
    }

    return md5.digest('hex')
}

async function fileHash(filePath) {
    return objHash(JSON.parse(await fs.readFile(filePath, 'utf8')))
}

async function mapConcurrent(items, concurrency, callback) {
    const results = new Array(items.length)
    let nextIndex = 0

    async function worker() {
        while (nextIndex < items.length) {
            const index = nextIndex
            nextIndex += 1
            results[index] = await callback(items[index])
        }
    }

    const workerCount = Math.min(concurrency, items.length)
    await Promise.all(Array.from({ length: workerCount }, worker))
    return results
}

async function collectTranslationFiles(directory, filename, files) {
    const entries = await fs.readdir(directory, { withFileTypes: true })

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name)
        if (entry.isDirectory()) {
            await collectTranslationFiles(entryPath, filename, files)
        } else if (entry.isFile() && entry.name === filename) {
            files.push(entryPath)
        }
    }
}

function sortObject(obj) {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return obj

    return Object.fromEntries(
        Object.entries(obj)
            .sort(([left], [right]) => compareStrings(left, right))
            .map(([key, value]) => [key, sortObject(value)]),
    )
}

class Manifest {
    constructor(translationDir, language = 'zh_Hans', workers = 8) {
        this.baseDir = path.resolve(translationDir)
        this.language = language
        this.workers = workers
    }

    async translationFiles() {
        const files = []
        const categories = await fs.readdir(this.baseDir, { withFileTypes: true })

        for (const category of categories) {
            if (category.isDirectory() && category.name !== 'manifest') {
                await collectTranslationFiles(path.join(this.baseDir, category.name), `${this.language}.json`, files)
            }
        }

        return files.sort((left, right) =>
            compareStrings(path.relative(this.baseDir, left), path.relative(this.baseDir, right)),
        )
    }

    async build() {
        const files = await this.translationFiles()
        const hashes = await mapConcurrent(files, this.workers, fileHash)
        const manifest = Object.create(null)

        for (let index = 0; index < files.length; index += 1) {
            const filePath = files[index]
            const parts = path.relative(this.baseDir, filePath).split(path.sep).slice(0, -1)
            let target = manifest

            for (const part of parts.slice(0, -1)) {
                if (!Object.hasOwn(target, part)) target[part] = Object.create(null)
                if (target[part] === null || typeof target[part] !== 'object') {
                    throw new Error(`Conflicting translation layout under ${JSON.stringify(part)}`)
                }
                target = target[part]
            }

            const key = parts.at(-1)
            if (Object.hasOwn(target, key)) {
                throw new Error(`Conflicting translation layout at ${path.dirname(filePath)}`)
            }
            target[key] = hashes[index]
        }

        manifest.hash = objHash(manifest)
        return manifest
    }

    async update() {
        const manifest = await this.build()
        const output = path.join(this.baseDir, 'manifest', `${this.language}.json`)

        await fs.mkdir(path.dirname(output), { recursive: true })
        const json = JSON.stringify(sortObject(manifest), null, 2).replaceAll('\n', os.EOL)
        await fs.writeFile(output, `${json}${os.EOL}`, 'utf8')
        return output
    }
}

function printHelp() {
    console.log(`Usage: node manifest.js [options] [languages...]

Generate translation manifests.

Options:
  --translation-dir <path>  Translation root (default: ./translation)
  --workers <number>        Files to hash concurrently (default: 8)
  -h, --help                Show this help`)
}

async function main() {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: {
            'translation-dir': { type: 'string' },
            workers: { type: 'string' },
            help: { type: 'boolean', short: 'h' },
        },
    })

    if (values.help) {
        printHelp()
        return
    }

    const workers = values.workers === undefined ? 8 : Number(values.workers)
    if (!Number.isInteger(workers) || workers < 1) {
        throw new Error('--workers must be a positive integer')
    }

    const translationDir = values['translation-dir'] ?? path.join(__dirname, 'translation')
    const languages = positionals.length > 0 ? positionals : ['zh_Hans']

    for (const language of languages) {
        const output = await new Manifest(translationDir, language, workers).update()
        console.log(`Generated ${output}`)
    }
}

module.exports = { Manifest, fileHash, objHash, traverse }

if (require.main === module) {
    main().catch(error => {
        console.error(error.message)
        process.exitCode = 1
    })
}
