const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(80, (req, res) => {
  console.log('server on! http://localhost:'+80);
})


app.get('/', (req, res) => {
  res.render('main')
})

// Routes �κ�
app.use('/market', require('./routes/market')); // 1





// DB Connect �κ�.
// mongoose.connect(
//   'mongodb+srv://okmlnsunok:jyp1234@cluster0.i8mgpkg.mongodb.net/hk?retryWrites=true&w=majority',
//   {
//      useNewUrlParser: true,
//   }
// )

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });


