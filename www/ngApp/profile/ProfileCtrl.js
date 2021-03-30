 
define(function (require) {
    var app = require('app');
    require("jquery"); 
    require("jquery-ui");
    app.controller('ProfileCtrl', ['titleService', function (titleService) {
        titleService.setTitle("Profile");

        this.idx=0;

        this.changeTab=function(number){
           this.idx=number;
        }
        
    }]);
});
