 
define(function (require) {
    var app = require('app');
    require("jquery"); 
    require("jquery-ui");
    app.controller('ProfileCtrl', [
        'titleService',
        '$http',
        'FileUploader', 
        function (titleService,$http,FileUploader) {
        var self=this;

        titleService.setTitle("Profile");

        this.idx=0;

        this.changeTab=function(number){
           this.idx=number;
        }

        $http.get("/profile").then(function(data){
            self.formObj=data.data; 
        })

        this.uploader = new FileUploader({
            onAfterAddingFile:function(item){
               //console.log(item)
               item.upload();
            } 
        });
        
    }]);
});
