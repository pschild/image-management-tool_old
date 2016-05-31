imt.directive('imageUpload', function($stateParams, UploadService, AlertifyService) {
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
                        AlertifyService.error('Fehler: Bilder konnten nicht hochgeladen werden. Verwenden Sie die Anwendung als Desktop-Anwendung?');
                    }
                    filePaths.push(files[i].path);
                }

                UploadService.upload({filePaths: filePaths, currentFolderPath: scope.currentFolderPath}).then(
                    function(response) {
                        AlertifyService.success('Bild(er) wurden hochgeladen');
                        scope.chosenFiles = [];
                    },
                    function(response) {
                        AlertifyService.error('Fehler: ' + response);
                    }
                );
            });
        }
    }
});
