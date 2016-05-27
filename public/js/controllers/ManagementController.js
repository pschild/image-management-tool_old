imt.controller('ManagementController', function ($scope, PersonService, PlaceService, TagService) {
    var self = this;

    this.loadPersons = function() {
        PersonService.getAll().then(function(response) {
            $scope.persons = response.data;
            $scope.persons.forEach(function(p) {
                if (p.birthday) {
                    p.birthday = new Date(p.birthday);
                }
            });
        });
    };

    this.loadPlaces = function() {
        PlaceService.getAll().then(function(response) {
            $scope.places = response.data;
        });
    };

    this.loadTags = function() {
        TagService.getAll().then(function(response) {
            $scope.tags = response.data;
        });
    };

    this.loadPersons();
    this.loadPlaces();
    this.loadTags();

    $scope.savePerson = function(item) {
        if (!item.id) {
            PersonService.create({
                name: item.name,
                birthday: item.birthday
            }).then(
                function() {
                    self.loadPersons();
                }
            );
        } else {
            PersonService.update(item.id, {
                name: item.name,
                birthday: item.birthday
            });
        }
    };

    $scope.removePerson = function(item) {
        if (item.id) {
            PersonService.delete(item.id).then(
                function() {
                    self.loadPersons();
                }
            );
        }
    };

    $scope.updatePlace = function(item) {
        console.log(item);
        if (!item.id) {
            PlaceService.create({
                name: item.name,
                address: item.address,
                country: item.country
            }).then(
                function() {
                    self.loadPlaces();
                }
            );
        } else {
            PlaceService.update(item.id, {
                name: item.name,
                address: item.address,
                country: item.country
            });
        }
    };

    $scope.removePlace = function(item) {
        if (item.id) {
            PlaceService.delete(item.id).then(
                function() {
                    self.loadPlaces();
                }
            );
        }
    };

    $scope.updateTag = function(item) {
        if (!item.id) {
            TagService.create({
                name: item.name
            }).then(
                function() {
                    self.loadTags();
                }
            );
        } else {
            TagService.update(item.id, {
                name: item.name
            });
        }
    };

    $scope.removeTag = function(item) {
        if (item.id) {
            TagService.delete(item.id).then(
                function() {
                    self.loadTags();
                }
            );
        }
    };
});