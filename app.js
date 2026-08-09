const path = require('path')
const cors = require('cors')
const express = require('express')
const compression = require('compression')

const app = express()
const PORT = process.env.PORT || 5000
const TRANSLATION_DIR = path.join(__dirname, 'translation')

app.disable('x-powered-by')

app.use(cors())
app.use(compression())
app.use('/translation', express.static(TRANSLATION_DIR, { index: false }))

app.get('/', (req, res) => res.redirect('https://github.com/anosu/muvluvgg-translation'))

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

module.exports = app
