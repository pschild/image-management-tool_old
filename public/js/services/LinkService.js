imt.factory('LinkService', ['$http', function ($http) {
    return {
        add: function(imageId, linkObject) {
            return $http.post('/api/links', {
                imageId: imageId,
                linkObject: linkObject
            });
        },

        remove: function(link) {
            return $http.delete('/api/links/' + link.imageId + '/' + link.personId);
        }
    }
}]);