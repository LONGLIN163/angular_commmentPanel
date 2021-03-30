
define(function (require) {
    var app = require('app');

    app.controller('LoginCtrl', ["$http","$state","loginService","titleService",function ($http,$state,loginService,titleService) {
        var self=this;
        titleService.setTitle("Login");
        this.login=function(){
            console.log("self.loginFormObj",self.loginFormObj)
            $http.post("/login",self.loginFormObj).then(function(data){
                console.log(data)
                var result=data.data.result;
                if(result==1){
                    alert("login success")
                    $state.go("root.home");
                    loginService.checkLogin();
                }else if(result==-1){
                    self.showErrTip=true;
                    self.errTip="Login failed, internal error, try it later!"
                }else if(result==-2){
                    self.showErrTip=true;
                    self.errTip="No this user!"
                }else if(result==-3){
                    self.showErrTip=true;
                    self.errTip="Password is incorrect!"
                }

            })
        }

    }]);
});
 