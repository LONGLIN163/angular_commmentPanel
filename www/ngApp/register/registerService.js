define(function(){
    var app=require("app");
    app.factory("registerService",["$http",function($http){
        function checkEmailExist(email,callback){
            $http.post("/checkexist",{"email":email}).then(function(data){     

            })
        }
        return {
            checkEmailExist:checkEmailExist //exports methods to outside
        }
    }])
})