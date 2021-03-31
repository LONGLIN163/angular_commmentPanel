 
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
            url :"/upload",
            filters: [{
                name: 'yourName1',
                // A user-defined filter
                fn: function(item) {
                    //console.log(item)
                    var type=item.type.slice(item.type.lastIndexOf("/")+1)
                    //console.log(type)
                    //console.log("|jpg|jpeg|png|bmp|gif|".indexOf(type)!==-1)
                    return "|jpg|jpeg|png|bmp|gif|".indexOf(type)!==-1;
                }
            }],
            onAfterAddingFile:function(item){
               //console.log(item)
               //console.log(item.file.size)
               if(item.file.size>200*1024){
                   alert("Please upload a image smaller than 200kb")
               }
               item.upload();
            },
            onWhenAddingFileFailed:function(){
                alert("Please upload a correct format pictrue!")
                //this.clearQueue();//*****incorrect***** */
                self.uploader.clearQueue();
                $("#imgFile").val("");
            },
            onCompleteItem :function(item, response, status, headers){
                //console.log(response) 

                self.uploader.clearQueue();
                $("#imgFile").val("");
            }


        });
        
    }]);
});
