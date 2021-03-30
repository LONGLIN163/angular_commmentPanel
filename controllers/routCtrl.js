
var formidable = require('formidable');
var User = require("../models/User");
var crypto=require("crypto")

exports.checkExist=function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            res.json({"result":-1});//-1: server error
            return;
        }
        var email=fields.email;
        //console.log(email);

        User.find({"email":email},function(err,results){
            if(err){
                res.json({"result":-1});//-1: server error
                return;
            }else{
              res.json({"result":results.length==0});
            }
        })
    })
}

exports.doRegister=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            res.json({"result":-1});//-1: server error
            return;
        }
        var email=fields.email;
        var password=crypto.createHash("sha256").update(fields.password).digest("hex");

        var u=new User({
            "email":email,
            "password":password
        });
        u.save(function(err){
            if(err){
                res.json({"result":-1});//-1: server error
                return;
            }else{
                // if success, send session to the user
                req.session.login=true;
                req.session.email=email;
                res.json({"result":1});//1: save into database
            }
        });
    })
}


exports.checkLogin=function(req,res){
    if(req.session.login){
         res.json({"login":true,"email":req.session.email})
    }else{
        res.json({"login":false})
    }
}