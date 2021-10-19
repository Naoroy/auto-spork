const express = require('express')
const app = express()


app.route('/')
  .get(function(req, res) {
    res.send({ msg: "Hello Spork" })
  })
app.route('/articles')
  .get(function(req, res) {
    res.send([
      { 
        title: '',
        content: '',
        date: new Date(),
        author: '',
        source: '',
      }
    ])
  })


if (!module.parent) app.listen(PORT)
module.exports = app
