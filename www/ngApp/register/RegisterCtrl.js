
define(function (require) {
    var app = require('app');
    require("./registerService");
    require("../ngDirective/passwordStrengthBar");
    app.controller('RegisterCtrl', ["registerService","titleService",function (registerService,titleService) {
        this.registerForm={};

        //change title here
        titleService.setTitle("Register");
        // this.getTitle=function(){
        //     return titleService.getTitle();
        //  }
        
        var self=this;
        //check if the user is exist
        this.checkExist=function(){
            console.log("email:"+email);
            var email=self.registerForm.email;
            if(email!=undefined){
                //let registerService to do the dirty work.
                registerService.checkEmailExist(email,function(data){

                })
            }

        }
    }]);
});
