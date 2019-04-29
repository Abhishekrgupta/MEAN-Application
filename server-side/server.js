var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/Information",
    {useNewUrlParser:true}
);

var dbConnect = mongoose.connection;
if(!dbConnect){
    console.log("Connected to Server");
    return;
}

module.exports = instance = express();

instance.use(bodyparser.urlencoded({extended:false}));
instance.use(bodyparser.json());
instance.use(cors());

var jwtSetting = {
    jwtSecret:"abhishek.gupta"
};

instance.set("jwtSecret", jwtSetting.jwtSecret);


var auth = require("./app.personinfo.auth/authentication.js");
var users = require("./app.personinfo.dals/user.js");
var roles = require("./app.personinfo.dals/role.js");
var personalInfo = require("./app.personinfo.dals/personalInfo.js");

//login
instance.post("/api/users/auth", function(request, response){
    //console.log("Hii...")
    auth.authUser(request, response)
});


//users operations
instance.get("/api/users",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        users.getUsers(request, response)
    }
});

instance.post("/api/users",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        users.postUser(request,response)
    }
});

instance.put("/api/users/:userId",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        users.putUser(request,response)
    }
});


//roles opertions
instance.get("/api/roles",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        roles.getRoles(request, response);
    }
});

instance.post("/api/roles",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        roles.postRole(request, response)
    }
});

instance.put("/api/roles/:roleId",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        roles.putRole(request, response)
    }
});

instance.get("/api/personalinfo",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personalInfo.getPersonalInfo(request, response)
    }
});

instance.post("/api/personalinfo",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personalInfo.postPersonalInfo(request, response)
    }
});

instance.put("/api/personalinfo",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personalInfo.putPersonalInfo(request, response)
    }
});

instance.get("/api/personalinfoapprove/:userId",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personalInfo.approvePersonalInfo(request, response)
    }
});

instance.get("/api/perinfoByStatus/:status",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personalInfo.perinfoByStatus(request, response)
    }
});

instance.get("/api/personalinfoid/:userId",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personalInfo.personalInfoById(request, response)
    }
});

instance.get("/api/personalinforeject/:userId",function(request, response){
    var isValToken = auth.authToken(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personalInfo.rejectPersonalInfo(request, response)
    }
});



instance.listen(4070, function(){
    console.log("Listing on port 4070")
});
