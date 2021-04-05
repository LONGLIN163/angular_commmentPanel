
var formidable = require('formidable');
var User = require("../models/User");
var crypto=require("crypto")
var gm=require("gm");
var url=require("url");
var Comment=require("../models/Comment");

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
                req.session.photo="";
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
             "nickname":req.session.nickname || "no nickname",
             "photo":req.session.photo || "/images/person.jpg"
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
                req.session.photo=results[0].photo;
                res.json({"result":1});//1: login success
                return;
            }else{
                res.json({"result":-3});//-3: password incorrect
            }

        })
    })
}


exports.logout=function(req,res){
    console.log("11111111111111111")
    req.session.login = false;
    req.session.email = "";
    req.session.nickname = "";
    res.redirect("/#!/login");
    return;
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


exports.updateProfile=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            res.json({"result":-1});//-1: server error
            return;
        }

        console.log("fields:",fields);


        var email=fields.email;
        //console.log(email)
        User.find({"email":email},function(err,results){
            if(err){
                res.json({"result":-1});//-1: server error
                return;
            }

            var u=results[0];

            u.nickname=fields.nickname;
            u.signature=fields.signature;
            u.photo=fields.photo;
            //u.password=fields.password;
            //console.log(typeof fields.password);
            //u.password=crypto.createHash("sha256").update(fields.password).digest("hex");
            //console.log("new password:",fields.password);
            //console.log("u:",u);
            u.save(function(err){
                if(err){
                    res.json({"result":-1});//-1: server error
                    return;
                }else{
                    req.session.login=true;
                    req.session.email=email;
                    req.session.nickname=results[0].nickname;
                    req.session.photo=results[0].photo;
                    res.json({"result":1});//1: save into database
                }
            });

        })
    })
}

exports.updatePwd=function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            res.json({"result":-1});//-1: server error
            return;
        }

        var email=  req.session.email;
        console.log(email)

        User.find({"email":email},function(err,results){
            if(err){
                res.json({"result":-1});//-1: server error
                return;
            }

            var u=results[0];
            u.password=crypto.createHash("sha256").update(fields.password).digest("hex");
            //console.log("new password:",fields.password);
            console.log("u:",u);
            u.save(function(err){
                if(err){
                    res.json({"result":-1});//-1: server error
                    return;
                }else{
                    req.session.login=true;
                    req.session.email=email;
                    req.session.nickname=results[0].nickname;
                    req.session.photo=results[0].photo;
                    res.json({"result":1});//1: save into database
                }
            });

        })
    })
}



exports.upload=function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./www/uploads";
    form.parse(req, function (err, fields, files) {
        if(err){
            res.json({"result":-1})//server error
        }
        // We need to limit pic not less than 100px both in width and height.
        // use gm to get image height and width
        gm(files.file.path).size(function (err, size) {
            if (!err)
                //console.log(size);
                if(size.width<100 || size.height<100){
                    res.json({"result":-2})//not ok
                }else{
                    res.json(files);
                }
            });
    });
}

exports.cut=function(req,res){
        var x = url.parse(req.url,true).query.x;
        var y = url.parse(req.url,true).query.y;
        var w = url.parse(req.url,true).query.w;
        var h = url.parse(req.url,true).query.h;

        var imgUrl=url.parse(req.url,true).query.url;
        //console.log("req",req)
        console.log(imgUrl)

        gm("./"+imgUrl).crop(w,h,x,y).resize(100,100,"!").write("./"+imgUrl,function(){
            req.session.photo=imgUrl.substr(4);
            res.json({"result": 1})
        });

}


exports.publishComment=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err){
            res.json({"result":-1})//server error
        }

        //Comment
        var email=  req.session.email;
        var content=  fields.content;
        var date=  new Date();

        console.log("content:",content)

        var c=new Comment({
            email:email,
            content:content,
            date:date
        });

        c.save(function(err){
            if(err){
                res.json({"result":-1});//-1: server error
                return;
            }else{
                res.json({"result":1});//1: save into database
            }
        });

    });
}

exports.getComment=function(req,res){
    Comment.find({},function(err,commentResults){
        //res.json({"results":commentResults})
        var r=[];
        commentResults.forEach(function(item){
            //console.log(item)
            User.find({"email":item.email},function(err,userResults){
                var u=userResults[0];
                if(!u) return;
                
                // //****model schema would not allow u to change the model, this one would not enter database */
                // item.nickname=u.nickname;
                // item.photo=u.photo;
                // item.signature=u.signature;
                // r.push(item);

                var o={
                    email:item.email,
                    date:item.date,
                    content:item.content,
                    nickname:u.nickname || "Sneaky Anonymous!",
                    photo:u.photo || "/images/person.jpg",
                    signature:u.signature || "This guy is lazy and has nothing left!"
                }

                r.push(o);

                if(r.length==commentResults.length){
                    res.json({"results":r})
                }

            })
        })
        //res.json({"results":r})
    })
}