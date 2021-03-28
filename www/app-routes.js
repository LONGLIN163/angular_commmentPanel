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
            .state('root.register', {
                url: '/register',
                templateUrl: 'ngApp/register/register.html',
                controllerUrl: 'ngApp/register/RegisterCtrl',
                controller: 'RegisterCtrl as registerCtrl'
            })
    }]);

    // ****************global service here*****************

    app.controller("MainCtrl",["titleService",function(titleService){
        this.getTitle=function(){
           return titleService.getTitle();
        }
   }])

   // controller title for each page
   app.factory("titleService",function(){
       var title="Home";
       return {
           getTitle:function(){
               return title; 
           },
           setTitle:function(str){
               title=str; 
           } 
       }
   });
});