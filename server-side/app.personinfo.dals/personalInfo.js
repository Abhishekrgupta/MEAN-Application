var mongoose = require("mongoose");
var rn = require('random-number');

var options = {
    min:  100000, 
    max:  999999, 
    integer: true
  }

var personalmod = require("./../app.personinfo.models/personalInfo.js");
var personalInfoModel = mongoose.model("PersonalInfo");
var tempPersonalInfoModel = mongoose.model("TempPersonalInfo");

module.exports={

    getPersonalInfo:function(request, response){

        personalInfoModel.find().exec(function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    postPersonalInfo:function(request, response){
        var userRole = request.body.roleId;   //get userrole admin/operator
        
        var condition = {
            userId: request.body.userId
        }
        console.log("PersId : ",request.body)
        if(request.body.personalinfoId=="")
        {
            var rmno = rn(options);
            var name = request.body.firstName;
            var init = name.substring(0,3);
            var personId = init+rmno;
            console.log("PersId : ",personId)
        }
        else{
            var personId = request.body.personalinfoId;
        }

        if(userRole=="1"){   //check userrole, if it is admin then save info in PersonalInfo table else save in temp table. 
            
            var personalInfo = {
                personinfoId:personId,
                fullName :{
                    firstName: request.body.firstName,
                    middleName: request.body.middleName,
                    lastName: request.body.lastName
                },
                gender: request.body.gender,
                dateOfBirth: request.body.dateOfBirth,
                age:  request.body.age, 
                address: {
                    flatNumber: request.body.flatNumber,
                    societyName: request.body.societyName,
                    areaName: request.body.areaName
                },
                email: request.body.email,
                city: request.body.city,
                state: request.body.state,
                pincode: request.body.pincode,
                phoneNo: request.body.phoneNo,                 
                mobileNo:request.body.mobileNo,
                physicalDisability:request.body.physicalDisability,                 
                maritalStatus:request.body.maritalStatus,
                education: request.body.education,
                birthSign:request.body.birthSign,                       
                isAuthorized: request.body.isAuthorized,
                userId:request.body.userId,
                status:"approved"
            }  
            
            //console.log(personalInfo)

           personalInfoModel.find(condition, function(error, data){

                //check userId is avaliable in personalinfo..if avaliable update...otw create new
                if(data.length>0){
                    personalInfoModel.updateOne(condition,personalInfo, function (err, res) {
                        if(err){
                            response.status = 500;
                            response.send({status:response.status, error:err});
                        }
                        response.send({status:200,message:"Personal Information Added Successfully"});
                    });
                }
                else{
                    personalInfoModel.create(personalInfo, function(err,res){
                        if(err){
                            response.status = 500;
                            response.send({status:response.status, error:err});
                        }
                        response.send({status:200, message:"Personal Information Added Successfully"});
                    });
                }
            });
            
        }
        else{
            var personalInfo = {
                personinfoId:personId,
                fullName :{
                    firstName: request.body.firstName,
                    middleName: request.body.middleName,
                    lastName: request.body.lastName
                },
                gender: request.body.gender,
                dateOfBirth: request.body.dateOfBirth,
                age:  request.body.age, 
                address: {
                    flatNumber: request.body.flatNumber,
                    societyName: request.body.societyName,
                    areaName: request.body.areaName
                },
                email: request.body.email,
                city: request.body.city,
                state: request.body.state,
                pincode: request.body.pincode,
                phoneNo: request.body.phoneNo,                 
                mobileNo:request.body.mobileNo,
                physicalDisability:request.body.physicalDisability,                 
                maritalStatus:request.body.maritalStatus,
                education: request.body.education,
                birthSign:request.body.birthSign,                       
                isAuthorized: request.body.isAuthorized,
                userId:request.body.userId,
                status:"pending" 
            }

            tempPersonalInfoModel.find(condition, function(error, data){

                //check userId is avaliable in personalinfo..if avaliable update...otw create new
                if(data.length>0){
                    tempPersonalInfoModel.updateOne(condition,personalInfo, function (err, res) {
                        if(err){
                            response.status = 500;
                            response.send({status:response.status, error:err});
                        }
                        response.send({status:200,message:"Personal Information Added Successfully. Approve will soon."});
                    });
                }
                else{
                    tempPersonalInfoModel.create(personalInfo, function(err,res){
                        if(err){
                            response.status = 500;
                            response.send({status:response.status, error:err});
                        }
                        response.send({status:200, message:"Personal Information Added Successfully. Approve will soon."});
                    });
                }
            });
        }
          
    },


    putPersonalInfo:function(request, response){
        var personalInfo = {
            personalID:request.body.personalID,
            fullName :{
                firstName: request.body.fullName.firstName,
                middleName: request.body.fullName.middleName,
                lastName: request.body.fullName.lastName
            },
            gender: request.body.gender,
            dateOfBirth: request.body.dateOfBirth,
            age:  request.body.age, 
            address: {
                flatNumber: request.body.address.flatNumber,
                societyName: request.body.address.societyName,
                areaName: request.body.address.areaName
            },
            email: request.body.email,
            city: request.body.city,
            state: request.body.state,
            pincode: request.body.pincode,
            phoneNo: request.body.phoneNo,                 
            mobileNo:request.body.mobileNo,
            physicalDisability:request.body.physicalDisability,                 
            maritalStatus:request.body.maritalStatus,
            education: request.body.education,
            birthSign:request.body.birthSign,                       
            isAuthorized: request.body.isAuthorized
        }

        tempPersonalInfoModel.create(personalInfo, function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, message:"Personal Information Updated Successfully. Approve will soon."});
        });
           
    },

    approvePersonalInfo:function(request, response){
        var condition = {
            userId: request.params.userId
        }

        console.log("condi : ", condition);
        
        
        tempPersonalInfoModel.find(condition, function(error, upData){
            console.log("hii...", upData.length);
            
            if(upData.length>0){
               
                var personalInfo = {
                    personinfoId:upData[0].personinfoId,
                    fullName :{
                        firstName: upData[0].fullName.firstName,
                        middleName: upData[0].fullName.middleName,
                        lastName: upData[0].fullName.lastName
                    },
                    gender: upData[0].gender,
                    dateOfBirth: upData[0].dateOfBirth,
                    age:  upData[0].age, 
                    address: {
                        flatNumber: upData[0].address.flatNumber,
                        societyName: upData[0].address.societyName,
                        areaName: upData[0].address.areaName
                    },
                    email: upData[0].email,
                    city: upData[0].city,
                    state: upData[0].state,
                    pincode: upData[0].pincode,
                    phoneNo: upData[0].phoneNo,                 
                    mobileNo:upData[0].mobileNo,
                    physicalDisability:upData[0].physicalDisability,                 
                    maritalStatus:upData[0].maritalStatus,
                    education: upData[0].education,
                    birthSign:upData[0].birthSign,                       
                    isAuthorized: upData[0].isAuthorized,
                    userId:upData[0].userId,
                    status:"approved" 

                }
                
               personalInfoModel.find(condition, function(error, data){

                    //check userId is avaliable in personalinfo..if avaliable update...otw create new
                    if(data.length>0){
                        personalInfoModel.updateOne(condition,personalInfo, function (err, res) {
                            if(err){
                                response.status = 500;
                                response.send({status:response.status, error:err});
                            }
                            response.send({status:200,message:"Personal Information Updation Approved"});
                        });
                    }
                    else{
                        personalInfoModel.create(personalInfo, function(err,res){
                            if(err){
                                response.status = 500;
                                response.send({status:response.status, error:err});
                            }
                            response.send({status:200, message:"Personal Information Inseration Approved"});
                        });
                    }

                    //after approve delete data from temp table
                    tempPersonalInfoModel.deleteOne(condition, function(err,res){
                            if(err){
                                response.status = 500;
                                response.send({status:response.status, error:err});
                            }
                    });
                });

            }
        });
        
    },

    perinfoByStatus:function(request, response){
       // console.log("Status : ",request.params.status)
        var reqStatus = request.params.status;

        var resInfo=[];

       if(reqStatus==="approved"){
            personalInfoModel.find().exec(function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
                else{
                    
                    for(var i=0; i<res.length; i++){
                        resInfo[i] = {
                            userId:res[i].userId,
                            personinfoId:res[i].personinfoId,
                            fullName:res[i].fullName.firstName+" "+res[i].fullName.middleName+" "+res[i].fullName.lastName,
                            dob:res[i].dateOfBirth,
                            mobile:res[i].mobileNo,
                            email:res[i].email,
                            city:res[i].city,
                            status:res[i].status
                        }
                    }
                    response.send({status:200, data:resInfo});
                }
                
            });
       }
       else{
           var condition = {status:reqStatus}
            tempPersonalInfoModel.find(condition).exec(function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
                else{
                    
                    for(var i=0; i<res.length; i++){
                        resInfo[i] = {
                            userId:res[i].userId,
                            personinfoId:res[i].personinfoId,
                            fullName:res[i].fullName.firstName+" "+res[i].fullName.middleName+" "+res[i].fullName.lastName,
                            dob:res[i].dateOfBirth,
                            mobile:res[i].mobileNo,
                            email:res[i].email,
                            city:res[i].city,
                            status:res[i].status
                        }
                    }
                    response.send({status:200, data:resInfo});
                }
            });
       }
    },

    personalInfoById:function(request, response){
        var userId = request.params.userId;
        condition = {userId:userId}
        personalInfoModel.find(condition).exec(function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    rejectPersonalInfo:function(request, response){
        var condition = {userId:request.params.userId}
        
        tempPersonalInfoModel.update(condition,{$set:{status:'rejected'}}).exec(function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, message:"Personal Information Rejected"});
        });
    }
}