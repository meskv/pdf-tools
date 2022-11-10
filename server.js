const express = require('express')
const path = require('path')
const multer = require('multer')
const app = express()
const port = 3000
const { mergePdfs } = require("./mergePdf")

const upload = multer({ dest: './public/data/uploads/' })
app.use('/static', express.static('public/merged'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 12), async (req, res, next) => {
    console.log(req.files)
    let fileName = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${fileName}.pdf`)

    // console.log(req.files);
    // res.send({ data: req.files })
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})