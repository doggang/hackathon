//서버 세팅.
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

//날씨 api 부분
const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=37.883495&lon=127.737834&exclude=minutely,daily,alerts&appid=';
const key = "4ae2a64ce51a17879d7eec964fccdfd5";
const url2 = '&units=metric&lang=kr';
const weather_api_url = url + key + url2;

app.get('/', (req, res) => {
  let 시간대별_날씨 = []
  request(weather_api_url, function (err, response, body) {
    const jsonData = body;
    const obj = JSON.parse(jsonData);
    let 현재날짜 = new Date();
    let date = 현재날짜.toLocaleString();
    현재시각 = 현재날짜.getHours();

    for (let i = 0; i < 12; i++) {
      let hours = 현재시각 + i;
      시간대별_날씨.push([hours, Math.round(obj.hourly[i].temp), Math.round(obj.hourly[i].feels_like), obj.hourly[i].weather[0].description, obj.hourly[i].humidity])
    }

    res.render('index', { hourly: 시간대별_날씨 , date:date})
  })
  
})

//시장 api 부분

var market_api_url = "https://api.odcloud.kr/api/15052836/v1/uddi:2253111c-b6f3-45ad-9d66-924fd92dabd7?page=5&perPage=10&serviceKey=Itx27hoOTX7JREb%2F0H%2FTuLY76tqW3vaUz6nmcS6bBKP%2BIwYhdA6m%2BmFxOugAS%2B9kbwxlIGOw8gf%2BDgeUoBKzzw%3D%3D";


app.get('/market/:id', (req, res) => {
  var 시장데이터 = []

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















