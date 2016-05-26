imt.factory('FolderStructureService', ['$http', function ($http) {
    return {
        get: function(path) {
            path = path || 'ROOT';

            if (path.slice(-1) == '/') {
                path = path.slice(0, -1); // cut off "/" at the end of path
            }
            return $http.get('/api/folderStructure/' + encodeURIComponent(path));
        },

        createDirectory: function(data) {
            return $http.post('/api/folderStructure/newDirectory', data);
        },

        removeDirectory: function(data) {
            return $http.delete('/api/folderStructure/removeDirectory', {
                params: {
                    data: data
                }
            });
        }
    }
}]);