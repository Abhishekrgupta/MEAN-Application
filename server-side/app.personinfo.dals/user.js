var mongoose = require("mongoose");
var rn = require('random-number');

var options = {
    min:  100000, 
    max:  999999, 
    integer: true
  }

var usrmod = require("./../app.personinfo.models/user.js");
var userModel = mongoose.model("Users");

module.exports = {

    getUsers:function(request, response){
        
        userModel.find().exec(function(err,res){
            if(err){
                respose.status = 500;
                response.send({status:respose.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    postUser:function(request, response){
        var rmno = rn(options);

        var user = {
            userId:rmno,
            userName:request.body.userName,
            email:request.body.email,
            password:request.body.password,
            roleId:request.body.roleId
        }

        condition = {
            userName:request.body.userName,
        }

        userModel.find(condition, function(error, data){
            if(data.length>0){
                response.send({status:200, message:"Username Already Exist"});
            }
            else{
                userModel.create(user, function(err,res){
                    if(err){
                        respose.status = 500;
                        response.send({status:respose.status, error:err});
                    }
                    response.send({status:200, message:"User Added Successfully"});
                });
            }
        });

        
    },

    putUser:function(request,response){
        var user = {
            userName:request.body.userName,
            email:request.body.email,
            password:request.body.password,
            roleId:request.body.roleId
        }

        var condition = {
            userId: request.params.userId
        }

        userModel.find({userName:request.body.userName}, function(error, data){
            if(data.length>0){
                response.send({status:200, message:"Username Already Exist"});
            }
            else{
                userModel.updateOne(condition, user, function (err, res) {
                    if(err){
                        respose.status = 500;
                        response.send({status:respose.status, error:err});
                    }
                    response.send({status:200,message:"User Updated Successfully"});
                });
            }
        });
    },
}