var mongoose = require("mongoose");

var loginStatusSchema = mongoose.Schema({
    loginStatusId :Number,
    userName:String,
    loginFrom:String,
    dateTime:String,
    ipAddress:String
})

module.exports = mongoose.model("LoginStatus", loginStatusSchema, "LoginStatus")