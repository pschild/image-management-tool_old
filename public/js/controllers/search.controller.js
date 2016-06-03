imt.controller('SearchController', function ($scope, $http) {
    $scope.areas = {};
    $scope.results = [];

    $scope.models = {
        image: {
            name: 'image',
            fields: [
                { description: 'Name', name: 'name', type: 'text' },
                { description: 'Kommentar', name: 'comment', type: 'text' },
                { description: 'Aufnahmedatum', name: 'shotAt', type: 'date' },
                { description: 'Erstellungsdatum', name: 'createdAt', type: 'date' }
            ]
        },
        person: {
            name: 'person',
            fields: [
                { description: 'Name', name: 'name', type: 'text' },
                { description: 'Geburtstag', name: 'birthday', type: 'date' }
            ]
        }
    };
    
    $scope.onAreaChange = function(model, areaRows) {
        $scope.areas[model.name] = areaRows;
    };

    $scope.startSearch = function() {
        $http.get('/api/search', {
                params: {
                    areas: $scope.areas
                }
            })
            .then(function(response) {
                $scope.results = response.data.result;
            });
    };
});