imt.factory('PlaceService', ['$http', function ($http) {
    return {
        get: function(id) {
            return $http.get('/api/places/' + id);
        },

        getAll: function() {
            return $http.get('/api/places');
        },

        create: function(data) {
            return $http.post('/api/places', data);
        },

        update: function(id, data) {
            return $http.put('/api/places/' + id, data);
        },

        delete: function(id) {
            return $http.delete('/api/places/' + id);
        }
    }
}]);