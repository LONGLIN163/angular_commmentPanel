
define(function (require) {
    var app = require('app');
    require("./registerService");
    require("../ngDirective/passwordStrengthBar");
    app.controller('RegisterCtrl', ["registerService","titleService",function (registerService,titleService) {

        this.registerFormObj = {
            password : ""
        };

        //change title here
        titleService.setTitle("Register");
        // this.getTitle=function(){
        //     return titleService.getTitle();
        //  }
        
        var self=this;
        //check if the user is exist
        this.checkExist=function(){
            console.log("email:"+email);
            var email=self.registerFormObj.email;
            if(email!=undefined){
                //let registerService to do the dirty work.
                registerService.checkEmailExist(email,function(data){
                    if(data == -1){
                        self.isExit = true;
                    }
                })
            }

        }

        self.passwordStrength=0;

        this.getStrength = function(){
            var password = self.registerFormObj.password;
            var lv = 0;
            if(password.match(/[a-z]/g)){lv++;}
            if(password.match(/[0-9]/g)){lv++;}
            if(password.match(/[A-Z]/g)){lv++;}
            if(password.match(/(.[^a-z0-9A-Z])/g)){lv++;}
            if(password.length < 6){
                lv = 0;
            }
            if(lv > 4){
                lv = 4;
            }

            console.log(lv)
            self.passwordStrength=lv;
            return self.passwordStrength;
        }
    }]);
});
