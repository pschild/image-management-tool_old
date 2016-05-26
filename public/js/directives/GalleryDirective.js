imt.directive('gallery', function($location, ImageService) {
    return {
        scope: {
            images: '='
        },
        templateUrl: 'views/gallery.html',
        link: function(scope, $element, $attrs) {
            scope.bulkList = [];

            scope.openImageForEdit = function(image) {
                $location.path('/image/edit/' + image.id);
            };

            scope.addImageToBulkList = function(checked, image) {
                if (checked) {
                    scope.bulkList.push(image.id);
                } else {
                    scope.bulkList = scope.bulkList.filter(function(id) {
                        return id != image.id;
                    });
                }

                ImageService.setImageIdsForMultipleEdit(scope.bulkList);
            };

            scope.handleSelected = function(selectedElements) {
                selectedElements.forEach(function(element) {
                    $(element).find('input[type=checkbox]').trigger('click');
                });
            };
        }
    }
});
