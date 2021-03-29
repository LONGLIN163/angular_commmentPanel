define(function(){
    var app=require("app");
    app.factory("registerService",["$http",function($http){
        function checkEmailExist(email,callback){
            $http.post("/checkExist",{"email":email}).then(callback);
        }

        function doUserRegister(email,password,callback){
            $http.post("/user",{
                "email":email,
                "password":password
            }).then(callback);
        }

        return {
            checkEmailExist:checkEmailExist, //exports methods to outside
            doUserRegister:doUserRegister
        }
    }])
})