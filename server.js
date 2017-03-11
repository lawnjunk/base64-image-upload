'use strict'

let cors = require('cors')
let express = require('express')
let jsonParser = require('body-parser').json({limit: '2mb'})
let fs = require('fs')
let url = require('url')

let app = express()
app.use(cors())

app.post('*', jsonParser, (req, res, next) => {
  console.log('req.body', req.body)

  let [info, image] = req.body.file.split(',')
  let [data, enc] = info.split(';')
  let [type, ext ] = data.split('/')

  console.log({info, data, enc, type, ext})

  fs.writeFile(`./lulwat.${ext}`, new Buffer(image, 'base64'), (err, data) => {
    res.send('goooood job')
  })
})


app.listen(2000, () => console.log('server up 2000'))
