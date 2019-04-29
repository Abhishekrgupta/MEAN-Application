
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const iplocation = require("iplocation").default;
var datetime = require('node-datetime');

var usrmod = require("../app.personinfo.models/user.js");
var userModel = mongoose.model("Users");

var rolemo = require("./../app.personinfo.models/role.js");
var roleModel = mongoose.model("Roles");

var loginstatusmod = require("../app.personinfo.models/loginStatus.js");
var loginStatusModel = mongoose.model("LoginStatus");

var instance = require('../server');


module.exports = {

    authUser:function(request,response){

        userModel.findOne({userName:request.body.userName}, function(error, usr){

            if(error){
                respose.status = 500;
                response.send({status:respose.status, error:error});
            }
            if(!usr){
                response.send({status:404, message:"Sorry user not avaliable"});
            }
            else if(usr){
                //console.log("User : "+usr)
                if(usr.password != request.body.password){
                    response.send({status:404, message:"Sorry username and passowrd does not match"});
                }
                else{
                        var token = jwt.sign({usr}, instance.get("jwtSecret"),{
                            expiresIn:3600
                        });
                        tokenStore = token;

                        var resData = {
                            token:token,
                            userId:usr.userId,
                            userName:usr.userName,
                            roleId:usr.roleId
                        }

                        response.send({status:200,message:"Login Success",data:resData});

                      
                }
            }
        });
    },

    authToken:function(receivedToken){
        var verify;
        jwt.verify(receivedToken, instance.get("jwtSecret"), function(error, decoded){
            if(error){
                verify=false;   
            }
            else{
                verify=true;
            }
        });
        return verify; 
    }
}