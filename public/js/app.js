var imt = angular.module('imt', ['ui.router', 'ngTagsInput', 'ui.bootstrap', 'ui.bootstrap.contextMenu']);

imt.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/files/');
    
    $stateProvider
        .state('files', {
            url: '/files/{path:[a-zA-Z0-9%/ ]*}',
            templateUrl: 'views/files.html',
            controller: 'FilesController'
        })
        .state('upload', {
            url: '/upload/{path:[a-zA-Z0-9%/ ]*}',
            templateUrl: 'views/upload.html',
            controller: 'UploadController'
        })
        .state('imageEdit', {
            url: '/image/edit/:id',
            templateUrl: 'views/image.html',
            controller: 'ImageController'
        })
        .state('imageMultipleEdit', {
            url: '/image/multipleEdit',
            templateUrl: 'views/image.html',
            controller: 'ImageController'
        })
        .state('management', {
            url: '/management',
            templateUrl: 'views/management.html',
            controller: 'ManagementController'
        })
        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        });
});

imt.filter('encodeURIComponent', function($window) {
    return $window.encodeURIComponent;
});