define(function(require){
    var app=require("app");
    //require("jquery");

    app.directive("cutPic",[function(){
        return {
            "restrict" : "E",
            "templateUrl" : "ngApp/ngDirectives/cut-pic.html",
            "scope" : {
                "img" 		: "@",
                "v" 		: "=",
                "maxwidth"  : "@",
                "maxheight"  : "@"
            },
            "link" : function($scope,ele){
                //First: big image box size = image size,after image loaded
                //limite max-width、max-height
                var $bigimg = $(ele).find(".bigimg");
                var $bigbox = $(ele).find(".bigbox");
                var $cutimg = $(ele).find(".cutimg");

                var bigimgW;		
                var bigimgH;		

            
                //receive variable 
                var cutObj = $scope["v"];
                cutObj.w = 100;
                cutObj.h = 100;
                cutObj.x = 0;
                cutObj.y = 0;

                //after image loaded
                $bigimg.bind("load",function(){
                    bigimgW =  $bigimg.width();
                    bigimgH =  $bigimg.height();

                    //the origin heigh and width
                    var realWidth = $(ele).find(".bigimg2").width();
                    var realHeight = $(ele).find(".bigimg2").height();

                    //calc rate
                    cutObj.ratio = bigimgW / realWidth;

                    //css limit max-width  and max-height
                    $bigbox.css({
                        "width" : bigimgW,
                        "height" : bigimgH
                    });
                    //control cutimg height and width
                    $cutimg.css({
                        "width": bigimgW,
                        "height" : bigimgH
                    });
                });


                //*****drag******/
                var $cut = $(ele).find(".cut");
                $cut.draggable({
                    "containment" : $bigbox,
                    "drag" : function(event,ui){
     
                        cutObj.x = ui.position.left;
                        cutObj.y = ui.position.top;


                        $cutimg.css({
                            "left": -cutObj.x,
                            "top" : -cutObj.y
                        });

                        //three previews
                        setPreviewBoxImage($(ele).find(".previewLbox"),100,100);
                        setPreviewBoxImage($(ele).find(".previewMbox"),70,70);
                        setPreviewBoxImage($(ele).find(".previewSbox"),40,40);

                    }
                }).resizable({
                    "aspectRatio" : 1 / 1,
                    "containment" : $bigbox,
                    "resize" : function(event,ui){
             
                        cutObj.w = ui.size.width;
                        cutObj.h = ui.size.height;

                        //three previews
                        setPreviewBoxImage($(ele).find(".previewLbox"),100,100);
                        setPreviewBoxImage($(ele).find(".previewMbox"),70,70);
                        setPreviewBoxImage($(ele).find(".previewSbox"),40,40);
                    }
                });


                function setPreviewBoxImage($boxele,boxwidth,boxheight){
                    var w = bigimgW / cutObj.w *  boxwidth;
                    var h = bigimgH / cutObj.h *  boxheight;
                    var x = cutObj.x * boxwidth / cutObj.w;
                    var y = cutObj.y * boxheight / cutObj.h;

                    $boxele.find("img").css({
                        "width"  : w,
                        "height" : h,
                        "left"   : -x,
                        "top"    : -y
                    });
                }
            }
        }
    }]);

})