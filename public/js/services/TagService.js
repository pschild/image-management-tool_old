imt.factory('TagService', ['$http', function ($http) {
    return {
        get: function(id) {
            return $http.get('/api/tags/' + id);
        },

        findByName: function(name) {
            return $http.get('/api/tags/name/' + name);
        },

        getAll: function() {
            return $http.get('/api/tags');
        },

        create: function(data) {
            return $http.post('/api/tags', data);
        },

        update: function(id, data) {
            return $http.put('/api/tags/' + id, data);
        },

        delete: function(id) {
            return $http.delete('/api/tags/' + id);
        }
    }
}]);