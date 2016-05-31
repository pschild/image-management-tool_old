imt.factory('ImageService', ['$http', function ($http) {
    var imageIdsForMultipleEdit = [];

    return {
        setImageIdsForMultipleEdit: function(ids) {
            imageIdsForMultipleEdit = ids;
        },

        getImageIdsForMultipleEdit: function() {
            return imageIdsForMultipleEdit;
        },

        get: function(id) {
            return $http.get('/api/images/' + id);
        },

        getAll: function() {
            return $http.get('/api/images');
        },

        create: function(data) {
            return $http.post('/api/images', data);
        },

        update: function(data) {
            return $http.put('/api/images', data);
        },

        delete: function(id) {
            return $http.delete('/api/images/' + id);
        }
    }
}]);