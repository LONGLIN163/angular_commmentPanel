define(function (require) {
    var app = require('./app');

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('root', {
                //url: '',
                templateUrl: 'ngApp/root/root.html',
                controllerUrl: 'ngApp/root/RootCtrl',
                controller: 'RootCtrl as rootctrl'
            })
            .state('root.home', {
                url: '/home',
                templateUrl: 'ngApp/home/home.html',
                controllerUrl: 'ngApp/home/HomeCtrl',
                controller: 'HomeCtrl as homectrl'
            })
            .state('root.music', {
                url: '/music',
                templateUrl: 'ngApp/music/music.html',
                controllerUrl: 'ngApp/music/MusicCtrl',
                controller: 'MusicCtrl as musicctrl'
            })
    }]);
});