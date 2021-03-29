var mongoose = require("mongoose");

//Create schema
var userSchema = new mongoose.Schema({
    "email": String,
    "nickname":String,
    "signature":String,
    "password":String
  });

//Create model
var User = mongoose.model('User', userSchema);

module.exports=User;