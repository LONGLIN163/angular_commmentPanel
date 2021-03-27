 
define(function (require) {
    var app = require('app');
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
