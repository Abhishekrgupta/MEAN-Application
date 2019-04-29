var mongoose = require("mongoose");

var rolemo = require("./../app.personinfo.models/role.js");
var roleModel = mongoose.model("Roles");

module.exports = {

    getRoles:function(request, response){
        roleModel.find().exec(function(err,res){
            if(err){
                respose.status = 500;
                response.send({status:respose.status, error:err});
            }
            response.send({status:200, data:res});
        });
        
    },

    postRole:function(request, response){
        var role = {
            roleId:request.body.roleId,
            roleName:request.body.roleName
        }
        var condition = {
            roleId:request.body.roleId
        }

        roleModel.find(condition, function(error, data){
            if(data.length>0){
                response.send({status:409, message:"Role Id Already Exist"});
            }
            else{
                roleModel.create(role, function(err,res){
                    if(err){
                        respose.status = 500;
                        response.send({status:respose.status, error:err});
                    }
                    response.send({status:200, message:"Role Added Successfully"});
                });
            }
        });
        
    },

    putRole:function(request,response){
        var role = {
            roleName:request.body.roleName
        }
        var condition = {
            roleId: request.params.roleId
        }

        roleModel.find({roleName:request.body.roleName}, function(error, data){
            if(data.length>0){
                response.send({status:200, message:"Role Already Exist"});
            }
            else{
                roleModel.updateOne(condition, role, function (err, res) {
                    if(err){
                        respose.status = 500;
                        response.send({status:respose.status, error:err});
                    }
                    response.send({status:200,message:"Role Updated Successfully"});
                });
            }
        });
    },

}