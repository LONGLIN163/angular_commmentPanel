define(function(){
    var app=require("app");
    app.factory("loginService",["$http",function($http){
        var isLogin=false;

        // function changeLogin(loginBoolean){
        //     isLogin=loginBoolean;
        // }
        // ******then change login status, but it s wrong,we should let the front end decide if we v logged in.
        // ****so we need to make service to change the login status. it know it

        //

        function changeLogin(){
            $http.get("/checkLogin").then(function(data){
                isLogin=data.data.login;
            })
        }

        function getLogin(){
            return isLogin;
        }

        return{
            changeLogin:changeLogin,
            getLogin:getLogin
        }
    }])
})