//************AMD************/
// define(["app"],function (app) {
//     app.controller('HomeCtrl', [function () {
//         this.a=10000;
//     }]);
// });

//************CMD************/
define(function (require) {
    var app = require('app');
    app.controller('RootCtrl', ['$scope', function ($scope) {
        this.a=10000;
    }]);
});
