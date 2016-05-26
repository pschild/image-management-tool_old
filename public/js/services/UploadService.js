imt.factory('UploadService', ['$http', function ($http) {
    return {
        upload: function(data) {
            return $http.post('/api/upload', data);
        }
    }
}]);