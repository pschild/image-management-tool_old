imt.factory('PersonService', ['$http', function ($http) {
    return {
        get: function(id) {
            return $http.get('/api/persons/' + id);
        },

        getAll: function() {
            return $http.get('/api/persons');
        },

        create: function(data) {
            return $http.post('/api/persons', data);
        },

        update: function(id, data) {
            return $http.put('/api/persons/' + id, data);
        },

        delete: function(id) {
            return $http.delete('/api/persons/' + id);
        }
    }
}]);