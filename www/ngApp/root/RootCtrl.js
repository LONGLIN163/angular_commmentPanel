//************CMD************/
define(function (require) {
    var app = require('app');
    require("../ngServices/loginService")
    app.controller('RootCtrl', ['loginService', function (loginService) {
        var self=this;
        // Once RootCtrl instantiated, we need to request loginservice to check login status
        loginService.checkLogin();

        this.getNickname=function(){
            return loginService.getNickname();
        }
        this.getEmail=function(){
            return loginService.getEmail();
        }

        this.getPhoto=function(){
            return loginService.getPhoto();
        }

        // databinding to the tag
        this.isLogin=function(){
           
            return loginService.getLogin();
        };

    }]);
});
 