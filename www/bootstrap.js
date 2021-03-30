require.config({
    baseUrl: '/',
    paths: {
        'angular': 'assets/angular/angular.min',
        'angular-ui-router': 'assets/angular-ui-router/release/angular-ui-router.min',
        'angular-async-loader': 'assets/angular-async-loader/angular-async-loader.min',
        'jquery': 'assets/jquery/dist/jquery.min',
        'jquery-ui': 'assets/jquery-ui/jquery-ui.min',
        'bootstrap': 'assets/bootstrap/dist/js/bootstrap.min',
        'angularFileUpload': 'assets/angular-file-upload/dist/angular-file-upload.min'
    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']},
        'angularFileUpload': {deps: ['angular']},
        'jquery': {exports: ['jquery']},
        'jquery-ui': {deps: ['jquery']},
        'bootstrap': {deps: ['jquery']}
    }
});

require(['angular', './app-routes'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});