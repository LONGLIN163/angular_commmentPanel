
define(function (require) {
    var app = require('app');
    require("./registerService");
    app.controller('RegisterCtrl', ["registerService",function (registerService) {
        this.registerForm={};
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
