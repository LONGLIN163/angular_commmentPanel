define(function(){
    var app=require("app");
    app.factory("loginService",["$http",function($http){
        var isLogin=false;
        var nickname="";
        var email="";

        // function changeLogin(loginBoolean){
        //     isLogin=loginBoolean;
        // }
        // ******then change login status, but it s wrong,we should let the front end decide if we v logged in.
        // ****so we need to make service to change the login status. it knows it
        //
        function checkLogin(){
            $http.get("/checkLogin").then(function(data){
                isLogin=data.data.login;
                nickname=data.data.nickname;
                email=data.data.email;
                photo=data.data.photo;
            })
        }

        function getNickname(){
            return nickname;
        }

        function getEmail(){
            return email;
        }

        function getLogin(){
            return isLogin;
        }

        function getPhoto(){
            return photo;
        }

        return{
            checkLogin:checkLogin,
            getLogin:getLogin,
            getNickname:getNickname,
            getEmail: getEmail,
            getPhoto: getPhoto
        }
    }])
})