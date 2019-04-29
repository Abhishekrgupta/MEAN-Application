var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    userId:Number,
    userName:String,
    email:String,
    password:String,
    roleId:Number
})

module.exports = mongoose.model("Users", userSchema, "Users")