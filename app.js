var express=require("express");
var mongoose=require("mongoose");
var session=require("express-session");
var routCtrl=require("./controllers/routCtrl")

//Create express app obj
var app = express();
//Connect to database
mongoose.connect('mongodb://localhost/myangulardb', {//********back up**********/
	useNewUrlParser: true,
	useCreateIndex:true
}).then(()=>{
	console.log("Connect to db success");
}).catch(err=>{
	console.log("ERROR",err.message);
});

//Use session
app.use(session({
	secret: 'myangulardb', 
	cookie: { maxAge: 1000 * 60 * 20 },
	resave: false ,  
	saveUninitialized : true
  }))

//routers
app.post("/checkExist" ,routCtrl.checkExist); 
app.post("/user"       ,routCtrl.doRegister); 
app.get("/checkLogin"  ,routCtrl.checkLogin); 
app.post("/login"      ,routCtrl.login); 

//staticize a folder
app.use(express.static('www')) 

//if page missing 
app.use(function(req,res){
    res.send("404! The page doesn't exist!!!");
})

//listening
var server = app.listen(process.env.PORT || 3000, function () {
var port = server.address().port;
console.log("App now running on port", port);
});


