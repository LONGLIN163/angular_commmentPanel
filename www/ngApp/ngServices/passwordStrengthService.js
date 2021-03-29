define(function(require){
    var app=require("app");

    app.factory("passwordStrengthService",[function(){
        function getPwdStrength(pwd){
            var password = pwd;
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

            //console.log(lv)
            //self.passwordStrength=lv;
            return lv;
        }

        return {
            getPwdStrength:getPwdStrength
        }
    }])

})