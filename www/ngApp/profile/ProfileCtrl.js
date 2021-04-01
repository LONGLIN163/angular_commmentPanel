 
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
               if(item.file.size>500*1024){
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
                // validate if the image is uploaded correctly(not less than 100).
                if(response.result==-2){
                    alert("The image u upload need to be bigger than 100*100");
                    self.uploader.clearQueue();
                    $("#imgFile").val("");
                    return;
                }else if(response.result==-1){
                    alert("Server error");
                    self.uploader.clearQueue();
                    $("#imgFile").val("");
                    return;
                }

                //after upload success, show cutting board
                self.showCuttingBoard=true;
   
                var str=response.file.path.substr(4);//remove www
                self.imgSrc=str;
                self.strCut=response.file.path;
                //console.log("-----",self.imgSrc)

                //***play with $compile***
                // $(".mask_profile .inner_box").append($compile('<cut-pic img="{{profilectrl.getImgSrc()}}" v="profilectrl.v" maxwidth="600" maxheight="400" ></cut-pic>'));
                // angular.element($(".mask_profile .inner_box")).append($compile("<my-angular-directive />")($scope));
                //var compileFn = $compile('<cut-pic img="" v="profilectrl.v" maxwidth="600" maxheight="400" ></cut-pic>');
                //var $dom = compileFn($scope);
                //console.log($dom)
                //angular.element(document.getElementById("inner_box")).append($dom);

                self.uploader.clearQueue();
                $("#imgFile").val("");
            }

        });

        this.getImgSrc=function(){
            return this.imgSrc;
        }

        this.cut=function(){
            //console.log(this.v)
            console.log(self.v.x / self.v.ratio)
            $http.get("/cut",{
                "params":{
                    x : self.v.x / self.v.ratio,
                    y : self.v.y / self.v.ratio,
                    w : self.v.w / self.v.ratio,
                    h : self.v.h / self.v.ratio,
                    url : self.strCut
               }
             }).then(function(data){
               //console.log(data)
               var result=data.data.result;
               if(result==1){
                   alert("Cut image done!")
               }
               //close the cutting model
               self.showCuttingBoard=false;
               // show new image
               //*********use ?ueryString to prevent to read saved cache****************
               self.formObj.photo=self.imgSrc+"?"+Date.parse(new Date());

            })
        }

        //get the head photo
        this.getPhoto=function(){
            return self.formObj.photo;
        }
        
    }]);
});
