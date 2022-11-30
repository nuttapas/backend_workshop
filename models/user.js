const mongoose = require('mongoose')
const users = new mongoose.Schema({
   username : String,
   password : String,
   fname : String,
   lname : String,
   nickname : String,
   age : Number,
   graduated : String,
   about : Object
})

module.exports = mongoose.model("users",users)