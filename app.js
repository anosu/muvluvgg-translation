const path = require('path')
const cors = require('cors')
const express = require('express')
const compression = require('compression')

const routers = {}

const app = express()
const PORT = process.env.PORT || 5000
const REPO_URL = 'https://github.com/anosu/muvluvgg-translation'

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use(cors())
app.use(compression())
app.use(express.json())

Object.entries(routers).forEach(([path, router]) => {
    app.use(`/${path}`, router)
})

app.all('/', (req, res) => res.redirect(REPO_URL))

Array.from(['names', 'titles', 'scenes']).forEach(cls => {
    app.get(`/translation/${cls}/*`, (req, res) => {
        const filePath = path.join(__dirname, 'translation', `${cls}/${req.params[0]}`)
        res.sendFile(filePath, err => err && res.sendStatus(404))
        // res.redirect(`${REPO_URL}/refs/heads/main/${cls}/${req.params[0]}`)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
