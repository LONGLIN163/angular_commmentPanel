
define(function (require) {
    var app = require('app');
    require("./registerService");
    require("../ngDirectives/passwordStrengthBar");
    require("../ngServices/passwordStrengthService");
    app.controller('RegisterCtrl', [
        "registerService",
        "titleService",
        "passwordStrengthService",
        "$state",
        "loginService",
        function (registerService,titleService,passwordStrengthService,$state,loginService) {

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
        self.emailErrTipClass="";

        //check if the user is exist
        //console.log("***",registerForm);//********we can get this form obj here*********
        this.checkEmail=function(){
            if(self.registerFormObj.email=="") return; 
            //step1 : we need to check if it pass the regexp rule
            if(self.showEmailErrTip=angular.element(registerForm.email).hasClass("ng-invalid-pattern")){
                //console.log(self.showEmailErrTip)
                self.emailErrTip="Illegal email, it has to be a standard email fomat!";
                self.emailErrTipClass="alert-danger";
                return;
            }
            
            // step2 : check if this email is exist in db
            registerService.checkEmailExist({"email":self.registerFormObj.email},function(data){
                    //console.log(data)
                    var isExist=data.data.result; 
                    //console.log(isExist)
                    if(isExist){ 
                       self.showEmailErrTip=true;
                       self.emailErrTip="Congrat, u can use this email!";
                       self.emailErrTipClass="alert-success";
                    }else{
                        self.showEmailErrTip=true;
                        self.emailErrTip="Sorry, this email has been used!";
                        self.emailErrTipClass="alert-danger";
                    }
            }); 
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


        this.doRegister=function(){
            registerService.doUserRegister(self.registerFormObj.email,self.registerFormObj.password,function(data){
                console.log(data)
                if(data.data.result==1){
                    alert("Register success!!!");
                    $state.go("root.home");// after Register, go to home directly
                    // ******then change login status, but it s wrong,we should let the front end decide if we v logged in.
                    //loginService.changeLogin(true);
                    //****so we need to make service to change the login status. it know it
                    loginService.checkLogin();
                }else{
                    alert("Register fail!!!");
                }
            })
        }
    }]);
});
