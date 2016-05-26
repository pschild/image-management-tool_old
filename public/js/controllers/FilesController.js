imt.controller('FilesController', function ($scope, $location, $stateParams, FolderStructureService) {
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

    this.getFoldersAndImages = function() {
        FolderStructureService.get($scope.currentFolderPath).then(
            function(response) {
                if (!response.data.success) {
                    alert('Error: ' + response.data.message);
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
        console.log($scope.newDirectoryName);
        if ($scope.newDirectoryName == '') {
            alert('Bitte geben Sie einen Namen ein.');
            return;
        }

        FolderStructureService.createDirectory({
            currentFolderPath: $scope.currentFolderPath,
            newDirectoryName: $scope.newDirectoryName
        }).then(
            function(response) {
                var success = response.data.success;

                if (success) {
                    $scope.newDirectoryName = '';
                    $scope.showNewDirectory = false;
                    self.getFoldersAndImages();
                } else {
                    alert('Fehler: ' + response.data.errorMessage);
                }
            }
        );
    };

    $scope.deleteFolder = function(directoryName) {
        var sure = confirm('Soll der Ordner "' + directoryName + '" wirklich gelöscht werden? Alle darin enthaltenen Ordner und Bilder gehen dabei verloren!');
        if (sure) {
            FolderStructureService.removeDirectory({
                currentFolderPath: $scope.currentFolderPath,
                directoryName: directoryName
            }).then(
                function(response) {
                    var success = response.data.success;

                    if (success) {
                        self.getFoldersAndImages();
                    } else {
                        alert('Fehler: ' + response.data.errorMessage);
                    }
                }
            );
        }
    };
});