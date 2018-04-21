const express = require('express');
const request = require('request');
// const https = require('https');
// const fs = require('fs');
const port = 8000;
const app = express();

app.set('view engine', 'ejs');  //tell Express we're using EJS
app.set('views', __dirname + '/views');  //set path to *.ejs files
//put your static files (js, css, images) into /public directory
app.use('/public', express.static(__dirname + '/public'));

"use strict";

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/payment', (req, res) => {
  // const apexxUrl = 'https://sandbox.apexxfintech.com/v1/checkout';
  const apexxUrl = 'https://apexx.dimebox.com/v1/checkout';

  const API_KEY = "	TrWzfw0KQ8Z1-uaQsOsbMABb2UMIhR-MgRFMCG5Tfcc";

  var reqBody = {
                  "account": "97a98914127313d929d7ae21",
                  "amount": 1750,
                  "customer": "ba99ac87c437f5d5667288ea",
                  "merchant_reference": "JJ-ORDER-0001",
                  "template_url": "https://lauralikespi.github.io/test.html",
                  "return_url": "https://jj7460.wixsite.com/visage",
                  "css_framework": "bootstrap-3.3.7",
                  "configurations": {
                      "card": {
                          "capture_now": true,
                          "dynamic_descriptor": "JJ eShop",
                          "threed_secure": {
                              "enabled": true ,
                              "description": "Short description, shown on 3DS page"
                          }
                      }
                  }
              };

  request.post({
    url: apexxUrl,
    headers: {
      'X-APIKEY': `${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  }, (err, response, body) => {
    console.log(response)
    body = JSON.parse(body);
    res.redirect(body.url)
  });
});

app.listen(port,function () {
  console.log('Server is listening on port '+ port +'. Ready to accept requests!');
});