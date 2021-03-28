define(function(require){
    var app=require("app");
    app.directive("passwordStrengthBar", function() {
        return {
            restrict:"E",
            scope: {},
            templateUrl: 'ngApp/ngDirective/passwordStrengthBar.html',
            link: function(scope) {
              scope.strength = 2;//0-5
            }
        };
    });
})