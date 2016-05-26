imt.directive('imageUpload', function($stateParams, UploadService) {
    return {
        scope: {},
        templateUrl: 'views/imageUpload.html',
        link: function(scope, $element, $attrs) {
            scope.chosenFiles = [];
            scope.currentFolderPath = $stateParams.path;

            var $fileDialog = $element.find('.file-dialog');
            var $chooseImagesButton = $element.find('.choose-images-button');
            var $uploadImagesButton = $element.find('.upload-images-button');

            $fileDialog.change(function() {
                scope.$apply(function() {
                    scope.chosenFiles = _.values($fileDialog[0].files);
                });
            });

            $chooseImagesButton.on('click', function() {
                $fileDialog.trigger('click');
            });

            $uploadImagesButton.on('click', function() {
                var files = $fileDialog[0].files;

                var filePaths = [];
                for (var i = 0; i < files.length; i++) {
                    if (!files[i].path) {
                        throw new Error('Could not find path-attribute for file. This is only working in a NW.js built version for desktop.');
                    }
                    filePaths.push(files[i].path);
                }

                UploadService.upload({filePaths: filePaths, currentFolderPath: scope.currentFolderPath}).then(
                    function(response) {
                        console.log('success', response);

                        alert('Bilder wurden hochgeladen.');
                        scope.chosenFiles = [];
                    },
                    function(response) {
                        console.log('error', response);
                    }
                );
            });
        }
    }
});
