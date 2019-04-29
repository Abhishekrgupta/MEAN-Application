var mongoose = require("mongoose");

const personalInfoSchema = mongoose.Schema({
    personinfoId:String,
    fullName: {
      firstName: String,
      middleName: String,
      lastName: String
    },
    gender: String,
    dateOfBirth: String,
    age: Number,        
    address: {
      flatNumber: String,
      societyName: String,
      areaName: String
    },
    email:  String,
    city: String,
    state: String,
    pincode: Number,
    phoneNo: Number,                 
    mobileNo: Number,
    physicalDisability: String,
    maritalStatus: String,
    education: String,
    birthSign:String,                        
    isAuthorized: String,
    userId:Number,
    status:String
  });
  
var perInfo =  mongoose.model("PersonalInfo", personalInfoSchema, "PersonalInfo");
module.exports = perInfo;

var tempPersonalInfo =  mongoose.model("TempPersonalInfo", personalInfoSchema, "TempPersonalInfo");
module.exports = tempPersonalInfo;