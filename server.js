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

var market_api_url = "https://api.odcloud.kr/api/15052836/v1/uddi:2253111c-b6f3-45ad-9d66-924fd92dabd7?page=5&perPage=10&serviceKey=Itx27hoOTX7JREb%2F0H%2FTuLY76tqW3vaUz6nmcS6bBKP%2BIwYhdA6m%2BmFxOugAS%2B9kbwxlIGOw8gf%2BDgeUoBKzzw%3D%3D";

var 시장데이터 = [];

app.get('/market/:id', (req, res) => {
  let num = parseInt(req.params.id);
  request(market_api_url, function (err, response, body) {
    const jsonData = body;
    const obj = JSON.parse(jsonData);

    for(let i = 0; i < 7; i++){
      시장데이터[i] = obj.data[i];
    }

    res.render('centerMarket', {"데이터" : 시장데이터[num]});
  })
  
  
})


//날씨 api 부분
const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=37.883495&lon=127.737834&exclude=minutely,daily,alerts&appid=';
const key = "4ae2a64ce51a17879d7eec964fccdfd5";
const url2 = '&units=metric&lang=kr';
const weather_api_url = url + key + url2;











