//************CMD************/
define(function (require) {
    var app = require('app');
    require("../ngServices/loginService")
    app.controller('RootCtrl', ['loginService', function (loginService) {

        // Once RootCtrl instantiated, we need to request loginservice to check login status
        loginService.changeLogin();
        
        // databinding to the tag
        this.isLogin=function(){
            return loginService.getLogin();
        };

    }]);
});
