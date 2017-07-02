const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')


app.get('/get', (req,res) => {
  
  request.get(req.query.site, (err,r,body) => {
    
    const $ = cheerio.load(body)
    
    var arr = []

    console.log(req.query.css)
    let els = $(req.query.css)

    els.each((index, el) => {

      let element = {}
      element.tag = el.tagName
      element.attribs = el.attribs
      arr.push(element)
    })

    res.json(arr)

  })

})

module.exports = app;
