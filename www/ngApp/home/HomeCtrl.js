//************AMD************/
// define(["app"],function (app) {
//     app.controller('HomeCtrl', [function () {
//         this.a=10000;
//     }]);
// });

//************CMD************/
define(function (require) {
    var app = require('app');
    //var jquery=require("jquery")
    /**
     * whatever we require(jquery) or use a variable require(jquery), jquey will always has a windows variable -----window.$
     * so we cau use it every where
     */
    require("jquery"); 
    require("jquery-ui");
    app.controller('HomeCtrl', ['$scope', function ($scope) {
        this.a="home here";
        $(".box").animate({"font-size":100},1000,function(){
            $(this).css("color","red");
            $(this).draggable();
        }) //jquery need write inside controller
        

    }]);
});
