var express = require('express');
var router = express.Router();
var Example = require('../models/Example');

router.post('/', function(req, res){ // 1
  let example = new Example();
  example.name = req.body.name;
  example.age = req.body.age;
  console.log(example)

  example.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('../');
  });
});

module.exports = router;