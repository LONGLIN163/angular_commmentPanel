//************AMD************/
// define(["app"],function (app) {
//     app.controller('HomeCtrl', [function () {
//         this.a=10000;
//     }]);
// });

//************CMD************/
define(function (require) {
    var app = require('app');
    app.controller('MusicCtrl', ['$scope', function ($scope) {
        this.a="Music here";

        alert($)
    }]);
});
