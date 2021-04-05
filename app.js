var express=require("express");
var mongoose=require("mongoose");
var session=require("express-session");
var routCtrl=require("./controllers/routCtrl")

//Create express app obj
var app = express();
//Connect to database
//mongoose.connect('mongodb://localhost/myangulardb', {//********back up**********

mongoose.connect('mongodb+srv://developerlin:Long2021...@cluster0.r4ghm.mongodb.net/myag1db?retryWrites=true&w=majority', {//********back up**********
	useNewUrlParser: true,
	useCreateIndex:true
}).then(()=>{
	console.log("Connect to db success");
}).catch(err=>{
	console.log("ERROR",err.message);
});

//Use session
app.use(session({
	secret: 'shuoshuo', 
	cookie: { maxAge: 1000 * 60 * 30 },
	resave: false ,  
	saveUninitialized : true
  }))

//routers
app.post("/checkExist" ,routCtrl.checkExist); 
app.post("/user"       ,routCtrl.doRegister); 
app.get("/checkLogin"  ,routCtrl.checkLogin); 
app.post("/login"      ,routCtrl.login); 
app.get("/logout"     ,routCtrl.logout); 

app.get("/profile"     ,routCtrl.profile); 
app.post("/profile"    ,routCtrl.updateProfile); 
app.post("/updatePwd"  ,routCtrl.updatePwd); 

app.post("/upload"     ,routCtrl.upload); 
app.get("/cut"         ,routCtrl.cut); 

app.post("/comment"    ,routCtrl.publishComment); 
app.get("/comment"    ,routCtrl.getComment); 

//staticize a folder
app.use(express.static('www')) 

//if page missing 
app.use(function(req,res){
    res.send("404! The page doesn't exist!!!");
})

//listening

// app.listen(process.env.PORT, '0.0.0.0');
// console.log("The app is running on server!")



var server = app.listen(process.env.PORT || 3000, function () {
var port = server.address().port;
console.log("App now running on port", port);
});


