 
define(function (require) {
    var app = require('app');
    require("jquery"); 
    require("jquery-ui");
    require("../ngServices/loginService")
    app.controller('HomeCtrl', ['titleService','loginService','$http' ,function (titleService,loginService,$http) {

        var self=this;

        titleService.setTitle("Home");

        loginService.checkLogin();

        this.checkLogin=function(){
          return loginService.getLogin();
        }

        this.comments=[];
        $http.get("/comment").then(function(data){
            self.comments=data.data.results;
            console.log(self.comments)
        })

        this.getNickname=function(){
            return loginService.getNickname();
        }
        this.getEmail=function(){
            return loginService.getEmail();
        }

        this.getPhoto=function(){
            return loginService.getPhoto();
        }

        this.postComment=function(e){
              //console.log(e)
              if(e.keyCode==13){
                  if(/(<([^>]+)>)/.test(self.content)){
                      alert("Html tags not allowed!")
                      return;
                  }
                  if(self.content==""){
                    alert("You can not send empty message!")
                    return;
                  }
                  $http.post("/comment",{
                      "content":self.content
                  }).then(function(data){
                      console.log(data.data.result)
                      var result=data.data.result;
                      if(result==1){
                        alert("Send message success!")
                        self.content="";
                      }
                  })
              }
        }
    }]); 
});
