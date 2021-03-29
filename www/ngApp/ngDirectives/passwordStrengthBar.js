define(function(require){
    var app=require("app");
    //require("jquery");
    app.directive("passwordStrengthBar", [function() {
        return {
            scope : {
				"strength" : "@"
			},
            restrict:"E",
            templateUrl: 'ngApp/ngDirectives/passwordStrengthBar.html',
            link: function($scope,ele) {
              //scope.strength = 2;//0-5

              var arrowWidth = $(ele).find("b.arrow").width();
              var barwidth = $(ele).find(".passwordStrengthBar").width();


              $scope.getPosition = function(){
                return {
                    "left" : barwidth / 5 * $scope.strength + (barwidth / 5 - arrowWidth) / 2 + "px"
                }
              }
            }
        };
    }]);
})