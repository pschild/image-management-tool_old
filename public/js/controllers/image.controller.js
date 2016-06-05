imt.controller('ImageController', function ($scope, $location, $stateParams, ImageService, PersonService, PlaceService, TagService, AlertifyService) {
    $scope.multipleEdit = $stateParams.id ? false : true;

    if (!$scope.multipleEdit) {
        ImageService.get($stateParams.id).then(function(response) {
            $scope.image = response.data;

            if ($scope.image.shotAt) {
                $scope.image.shotAt = new Date($scope.image.shotAt);
            }
        });
    } else {
        $scope.images = [];
        $scope.image = {};
        $scope.imageIds = ImageService.getImageIdsForMultipleEdit();

        $scope.imageIds.forEach(function(imageId) {
            ImageService.get(imageId).then(function(response) {
                $scope.images.push(response.data);
            });
        });
    }

    PlaceService.getAll().then(function(response) {
        $scope.places = response.data;
    });

    TagService.getAll().then(function(response) {
        $scope.tags = response.data;
    });

    $scope.filterTags = function(query) {
        return $scope.tags.filter(function(tag) {
            return tag.name.toLowerCase().search(query.toLowerCase()) >= 0;
        });
    };

    $scope.saveImage = function() {
        if (!$scope.multipleEdit) {
            ImageService.update($scope.image).then(function() {
                AlertifyService.success('Bild gespeichert');
            });
        } else {
            $scope.images.forEach(function(image) {
                image = _.extend(image, $scope.image);
                ImageService.update(image).then(function() {
                    AlertifyService.success('Bild gespeichert');
                });
            });
        }
    };

    $scope.deleteImage = function() {
        AlertifyService.confirm('Bild löschen', 'Sind Sie sich, dass Sie dieses Bild löschen wollen?', function() {
            ImageService.delete($scope.image.id).then(function() {
                AlertifyService.success('Bild gelöscht');
                $location.path('files');
            });
        });
    };

    $scope.cancel = function() {
        var path;
        if (!$scope.multipleEdit) {
            path = $scope.image.path;
        } else {
            path = $scope.images[0].path;
        }

        $location.path('files/' + path);
    };
});