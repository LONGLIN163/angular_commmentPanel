
define(function (require) {
    var app = require('app');
    require("./registerService");
    require("../ngDirectives/passwordStrengthBar");
    require("../ngServices/passwordStrengthService");
    app.controller('RegisterCtrl', ["registerService","titleService","passwordStrengthService",function (registerService,titleService,passwordStrengthService) {

        this.registerFormObj = {
            email : "",
            password : "",
            password2 : ""
         };

        //change title here
        titleService.setTitle("Register");
        // this.getTitle=function(){
        //     return titleService.getTitle();
        //  }
        
        var self=this;
        self.showEmailErrTip=false;
        self.emailErrTip="";

        //check if the user is exist
        //console.log("***",registerForm);//********we can get this form obj here*********
        this.checkEmail=function(){          
            //console.log(registerForm.email.$invalid)
            self.showEmailErrTip=angular.element(registerForm.email).hasClass("ng-invalid-pattern")
            console.log(self.showEmailErrTip)
            self.emailErrTip="illegal email, it has to be a standard email fomat!";

        }

        self.passwordStrength=0;
        self.showPwdStrengthErrTip=false;
        this.checkIfPwdWeak=function(){ 
            self.showPwdStrengthErrTip=self.getStrength()<2;
        }
        this.getStrength =function(){
            self.passwordStrength=passwordStrengthService.getPwdStrength(self.registerFormObj.password);
            return self.passwordStrength;
        }

        self.showDiffPwdTip=false;
        this.checkIfDiffPwd=function(){
            if(self.registerFormObj.password!="" && self.registerFormObj.password2!=""){
                if(self.registerFormObj.password!=self.registerFormObj.password2){
                    self.showDiffPwdTip=true;
                }else{
                    self.showDiffPwdTip=false;
                }
            }
        }
    }]);
});
