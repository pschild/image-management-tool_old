imt.controller('SearchController', function ($scope) {
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
});