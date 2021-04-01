var mongoose = require("mongoose");

//Create schema
var commentSchema = new mongoose.Schema({
    "email": String,
    "content":String,
    "date":String,
    "like":[String], //database can not persist image, we have to use url
    "comments":[String]
  });

//Create model
var Comment = mongoose.model('Comment', commentSchema);

module.exports=Comment;