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
  var map_url = []
  var img_name;

  let num = parseInt(req.params.id);
  request(market_api_url, function (err, response, body) {
    const jsonData = body;
    const obj = JSON.parse(jsonData);
  
    for(let i = 0; i < 7; i++){
      시장데이터[i] = obj.data[i];
    }
  
    map_url[0] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.562960508801!2d127.72346471527861!3d37.87051527974206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e5d511d3a4b3%3A0x53b2860804ec324!2z7LaY7LKc64Ko67aA7Iuc7J6l!5e0!3m2!1sko!2skr!4v1667191383515!5m2!1sko!2skr"
    map_url[1] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.273403690518!2d127.73169811527886!3d37.87728837974095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e5db28e3bbcb%3A0xea0cd5cae44fe281!2z64-Z67aA7Iuc7J6l!5e0!3m2!1sko!2skr!4v1667191424556!5m2!1sko!2skr"
    map_url[2] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.94803316109!2d127.72239331527915!3d37.884897979739605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e5df7728c169%3A0xfc84477a91e17c62!2z7LaY7LKc7ISc67aA7Iuc7J6l!5e0!3m2!1sko!2skr!4v1667191433805!5m2!1sko!2skr"
    map_url[3] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.640381738239!2d127.72455941527936!3d37.892091979738325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e5e3cbe254fb%3A0x41ba4f34dd4a2524!2z67KI6rCc7Iuc7J6l!5e0!3m2!1sko!2skr!4v1667191446275!5m2!1sko!2skr"
    map_url[4] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12597.060382620413!2d127.70851693955079!3d37.877482700000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e5d786a0c259%3A0xfa72686838452351!2z7KCc7J287KKF7ZWp7Iuc7J6l!5e0!3m2!1sko!2skr!4v1667191460330!5m2!1sko!2skr"
    map_url[5] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.6730456181117!2d127.7148103152787!3d37.86793997974262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e6869845e4b5%3A0x6e4e4a6aa7ceb2b4!2z7LaY7LKc7ZKN66y87Iuc7J6l!5e0!3m2!1sko!2skr!4v1667191470748!5m2!1sko!2skr"
    map_url[6] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.238515901602!2d127.72319571527899!3d37.8781043797408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e5d78bae01db%3A0xe9b12b9d93e07580!2z7LaY7LKc7KSR7JWZ7Iuc7J6l!5e0!3m2!1sko!2skr!4v1667191479176!5m2!1sko!2skr" 

    if(num == 0){
      img_name = "first.jpg" 
    }
    else if(num ==1){
      img_name = "second.jpg" 
    }
    else if(num ==2){
      img_name = "third.jpg" 
    }
    else if(num ==3){
      img_name = "four.jpg" 
    }
    else if(num ==4){
      img_name = "five.jpg" 
    }
    else if(num ==5){
      img_name = "six.jpg" 
    }
    else{
      img_name = "seven.jpg"
    }


    res.render('centerMarket', {"데이터" : 시장데이터[num], "url" : map_url[num], "imgName" : img_name});
  })
})

app.get('/recommend', (req, res) => {
  res.render('rec');
})
















