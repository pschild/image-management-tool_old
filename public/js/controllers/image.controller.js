imt.controller('ImageController', function ($scope, $location, $stateParams, $q, ImageService, PersonService, PlaceService, TagService, AlertifyService) {
    $scope.multipleEdit = $stateParams.id ? false : true;

    if (!$scope.multipleEdit) {
        ImageService.get($stateParams.id).then(function(response) {
            $scope.image = response.data;

            if ($scope.image.shotAt) {
                $scope.image.shotAt = new Date($scope.image.shotAt);
            }
        });
    } else {
        var promises = [];

        $scope.imageIds = ImageService.getImageIdsForMultipleEdit();
        $scope.imageIds.forEach(function(imageId) {
            promises.push(ImageService.get(imageId));
        });

        $scope.images = [];
        $scope.image = {};
        $q.all(promises).then(function(responses) {
            responses.forEach(function(image) {
                $scope.images.push(image.data);
            });

            // comment, Place/placeId, Tags[], shotAt
            $scope.image.comment = findCommons('comment', $scope.images);

            var commonShotAt = findCommons('shotAt', $scope.images);
            if (commonShotAt) {
                $scope.image.shotAt = new Date(commonShotAt);
            }

            $scope.image.Place = findCommons('Place', $scope.images);

            $scope.image.Tags = findCommons('Tags', $scope.images, function(tag) {
                if (tag) {
                    return tag.id;
                }
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
            var promises = [];
            $scope.images.forEach(function(image) {
                image = _.extend(image, $scope.image);
                promises.push(ImageService.update(image));
            });

            $q.all(promises).then(function() {
                AlertifyService.success('Alle Bilder gespeichert');
            });
        }
    };

    $scope.deleteImage = function() {
        AlertifyService.confirm('Bild löschen', 'Sind Sie sich, dass Sie dieses Bild löschen wollen?', function() {
            ImageService.delete($scope.image.id).then(function() {
                AlertifyService.success('Bild gelöscht');
                $location.path('files/' + $scope.image.path);
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

    function findCommons(property, collection, reducerFn) {
        var difference = false;
        var returnValue = undefined;
        var compareValue = undefined;

        var currentCompareValue;

        collection.forEach(function(item) {
            currentCompareValue = reducerFn ? reducerFn.apply(this, item[property]) : item[property];
            if (!compareValue) {
                compareValue = currentCompareValue;
            }

            if (!returnValue) {
                returnValue = item[property];
                return;
            }

            if (!difference) {
                if (typeof item[property] == 'string') {
                    difference = compareValue != currentCompareValue;
                } else if (typeof item[property] == 'object') {
                    difference = !_.isEqual(compareValue, currentCompareValue);
                }
            }
        });

        return difference ? undefined : returnValue;
    }
});