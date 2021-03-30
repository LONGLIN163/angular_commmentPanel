define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');
    require('angularFileUpload');

    var app = angular.module('app', ['ui.router','angularFileUpload']); // why ui.router is not the same????

    // initialze app module for angular-async-loader
    asyncLoader.configure(app);

    module.exports = app;
});