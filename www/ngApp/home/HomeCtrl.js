 
define(function (require) {
    var app = require('app');
    require("jquery"); 
    require("jquery-ui");
    require("../ngServices/loginService")
    app.controller('HomeCtrl', ['titleService','loginService', function (titleService,loginService) {
        titleService.setTitle("Home");

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

        this.postComment=function(e){
              console.log(e)
              if(e.keyCode==13){
                  alert("ok")
              }
        }

    }]); 
});
