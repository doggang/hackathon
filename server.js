const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
// require('dotenv').config()

// app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(80, (req, res) => {
  console.log('server on! http://localhost:'+80);
})

// mongoose.connect(
//   process.env.DB_URL,
//   {
//      useNewUrlParser: true,
//   }
// )

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });