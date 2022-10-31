const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const request = require('request');
const { json } = require('body-parser');

app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(80, (req, res) => {
  console.log('server on! http://localhost:'+80);
})

app.get('/', (req, res) => {
  res.render('index')
})

var api_url = "https://api.odcloud.kr/api/15052836/v1/uddi:2253111c-b6f3-45ad-9d66-924fd92dabd7?page=5&perPage=10&serviceKey=Itx27hoOTX7JREb%2F0H%2FTuLY76tqW3vaUz6nmcS6bBKP%2BIwYhdA6m%2BmFxOugAS%2B9kbwxlIGOw8gf%2BDgeUoBKzzw%3D%3D";

var 시장데이터 = [];
var 시장명 = [];

app.get('/market:', (req, res) => {
  res.render('centerMarket');

  request(api_url, function (err, res, body) {
    const jsonData = body;
    const obj = JSON.parse(jsonData);
    for(let i = 0; i < 7; i++){
      시장데이터[i] = obj.data[i];
      시장명[i] = obj.data[i].시장데이터;
    }
    console.log(시장명);
  })
})


