const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const url = require('valid-url')


app.all('/', (req,res) => {
  res.send('fastparser is the easiest way to parse a web page')
})

app.all('/version', (req,res) => {
  res.send('v. 0.0.3')
})

app.get('/parse', (req,res) => {
  
  let site = req.query.site
  let css = req.query.css

  if(site && css) {
    
    if (url.isHttpUri(site) || url.isHttpsUri(site)){

      request.get(site, (err,r,body) => {

        const $ = cheerio.load(body)
        
        var result = {
          success: true,
          elements: []
        }

        console.log(css)
        let els = $(css)

        els.each((index, el) => {

          let element = {}

          element.tag = el.tagName
          element.attribs = el.attribs

          element.text = $(el).text()

          result.elements.push(element)
        })

        res.json(result)

      })
    
    } else {
      res.json({
        success: false,
        error: 'not valid url'
      })
    }

  } else {
    res.json({
      success: false,
      error: '2 arguments required in the request query - site and css'
    })
  }

})

module.exports = app;
