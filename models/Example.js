const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');

const ExampleSchema = new Schema({
    name: {//post_id + user_id
      type: String,
      required: true,
    },
    age : {
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('example', ExampleSchema);