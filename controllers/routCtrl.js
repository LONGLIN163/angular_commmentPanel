
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
         res.json({
             "login":true,
             "email":req.session.email,
             "nickname":req.session.nickname || "no nickname"
            })
    }else{
        res.json({"login":false})
    }
}

exports.login=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            res.json({"result":-1});//-1: server error
            return;
        }
        var email=fields.email;
        //console.log(email)
        User.find({"email":email},function(err,results){
            if(err){
                res.json({"result":-1});//-1: server error
                return;
            }
            if(results.length==0){
                res.json({"result":-2});//-1: no such user
                return;
            }

            //then check if password is correct
            var password=crypto.createHash("sha256").update(fields.password).digest("hex");
            if(password===results[0].password){
                //if success, send session
                req.session.login=true;
                req.session.email=email;
                req.session.nickname=results[0].nickname;
                res.json({"result":1});//1: login success
                return;
            }else{
                res.json({"result":-3});//-3: password incorrect
            }

        })
    })
}

exports.profile=function(req,res){
    if(!req.session.login){
        res.json({
            "result":-1,
            "err":"For access this page, you have to login."
        })
        return;
   }

   var email=req.session.email;
   //console.log(email)
   User.find({"email":email},function(err,results){
       res.json({
           "email":results[0].email,
           "nickname":results[0].nickname || "No nickname!",
           "photo":results[0].photo || "/images/person.jpg",
           "signature":results[0].signature || "This guy is lazy and has nothing left!"
       });
   })
}