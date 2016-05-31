imt.controller('FilesController', function ($scope, $location, $stateParams, FolderStructureService, AlertifyService) {
    var self = this;

    $scope.currentUrl = $location.path();
    if ($scope.currentUrl.slice(-1) == '/') {
        $scope.currentUrl = $scope.currentUrl.slice(0, -1); // cut off "/" at the end of path
    }

    $scope.parentFolderPath = $scope.currentUrl.split('/');
    $scope.parentFolderPath.pop();
    $scope.parentFolderPath = $scope.parentFolderPath.join('/');

    $scope.currentFolderPath = $stateParams.path;

    $scope.newDirectoryName = '';
    $scope.showNewDirectory = false;

    $scope.folderContextMenu = [
        ['Löschen', function ($itemScope) {
            $scope.deleteFolder($itemScope.folderName);
        }]
    ];

    this.getFoldersAndImages = function() {
        FolderStructureService.get($scope.currentFolderPath).then(
            function(response) {
                if (!response.data.success) {
                    AlertifyService.error('Fehler: ' + response.data.message);
                    return;
                }
                $scope.folderNames = response.data.folderNames;
                $scope.images = response.data.images;
            });
    };

    this.getFoldersAndImages();

    $scope.handleAddImageClicked = function() {
        $location.path('/upload/' + $scope.currentFolderPath);
    };

    $scope.saveNewDirectory = function() {
        if ($scope.newDirectoryName == '' || $scope.newDirectoryName.replace(/ /g, '') == '') {
            AlertifyService.alert('Hinweis', 'Bitte geben Sie einen Namen ein.');
            return;
        }

        FolderStructureService.createDirectory({
            currentFolderPath: $scope.currentFolderPath,
            newDirectoryName: $scope.newDirectoryName
        }).then(
            function(response) {
                var success = response.data.success;

                if (success) {
                    AlertifyService.success('Ordner "' + $scope.newDirectoryName + '" wurde angelegt.');
                    $scope.newDirectoryName = '';
                    $scope.showNewDirectory = false;
                    self.getFoldersAndImages();
                } else {
                    AlertifyService.error('Fehler: ' + response.data.errorMessage);
                }
            }
        );
    };

    $scope.deleteFolder = function(directoryName) {
        AlertifyService.confirm('Ordner löschen', 'Soll der Ordner "' + directoryName + '" wirklich gelöscht werden? Alle darin enthaltenen Ordner und Bilder gehen dabei verloren!', function() {
            FolderStructureService.removeDirectory({
                currentFolderPath: $scope.currentFolderPath,
                directoryName: directoryName
            }).then(
                function(response) {
                    var success = response.data.success;

                    if (success) {
                        self.getFoldersAndImages();
                        AlertifyService.success('Ordner "' + directoryName + '" wurde gelöscht.');
                    } else {
                        AlertifyService.error('Fehler: ' + response.data.errorMessage);
                    }
                }
            );
        });
    };
});