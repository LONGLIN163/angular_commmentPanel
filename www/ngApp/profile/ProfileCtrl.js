 
define(function (require) {
    var app = require('app');
    require("jquery"); 
    require("jquery-ui");
    require("../ngDirectives/cut-pic");
    app.controller('ProfileCtrl', [
        'titleService',
        '$http',
        'FileUploader', 
        '$compile',
        '$scope',
        function (titleService,$http,FileUploader,$scope,$compile) {

        var self=this;

        titleService.setTitle("Profile");

        this.idx=0;

        this.changeTab=function(number){
           this.idx=number;
        }

        $http.get("/profile").then(function(data){
            self.formObj=data.data; 
        })


        this.v = {"w" : 0 , "h" : 0 , "x" : 0 , "y" : 0};
        this.showCuttingBoard=false;
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
                //after upload success, show cutting board
                self.showCuttingBoard=true;
                //var str=response.file.path.substr(4);//remove www
                //self.imgSrc=str;
                //console.log("-----",self.imgSrc)

                //***play with $compile***
                // $(".mask_profile .inner_box").append($compile('<cut-pic img="{{profilectrl.getImgSrc()}}" v="profilectrl.v" maxwidth="600" maxheight="400" ></cut-pic>'));
                // angular.element($(".mask_profile .inner_box")).append($compile("<my-angular-directive />")($scope));
                var compileFn = $compile('<cut-pic img="" v="profilectrl.v" maxwidth="600" maxheight="400" ></cut-pic>');
                var $dom = compileFn($scope);
                //console.log($dom)
                angular.element(document.getElementById("inner_box")).append($dom);

                self.uploader.clearQueue();
                $("#imgFile").val("");
            }

        });

        this.getImgSrc=function(){
            return this.imgSrc;
        }
        
    }]);
});
