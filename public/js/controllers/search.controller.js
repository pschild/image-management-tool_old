imt.controller('SearchController', function ($scope, $http) {
    $scope.areas = [];
    $scope.results = [];

    $scope.models = {
        image: {
            name: 'image',
            fields: [
                { name: 'name', type: 'text' },
                { name: 'comment', type: 'text' },
                { name: 'shotAt', type: 'date' },
                { name: 'createdAt', type: 'date' }
            ]
        },
        person: {
            name: 'person',
            fields: [
                { name: 'name', type: 'text' },
                { name: 'birthday', type: 'date' }
            ]
        }
    };
    
    $scope.onAreaChange = function(model, areaRows) {
        $scope.areas[model.name] = areaRows;
    };

    $scope.startSearch = function() {
        console.log($scope.areas);
        $http.get('/api/search', {
                params: {
                    fields: 1
                }
            })
            .then(function(response) {
                $scope.results = response.data.result;
            });
    };
});