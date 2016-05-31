imt.controller('ManagementController', function ($scope, PersonService, PlaceService, TagService, AlertifyService) {
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
                function(response) {
                    $scope.persons.push(response.data);
                    AlertifyService.success('Person gespeichert');
                }
            );
        } else {
            PersonService.update(item.id, {
                name: item.name,
                birthday: item.birthday
            }).then(
                function() {
                    AlertifyService.success('Person gespeichert');
                }
            );
        }
    };

    $scope.removePerson = function(item) {
        if (item.id) {
            PersonService.delete(item.id).then(
                function() {
                    var newPersons = [];
                    var person;
                    for (var i = 0; i < $scope.persons.length; i++) {
                        person = $scope.persons[i];
                        if (person.id != item.id) {
                            newPersons.push(person);
                        }
                    }
                    $scope.persons = newPersons;

                    AlertifyService.success('Person gelöscht');
                }
            );
        }
    };

    $scope.savePlace = function(item) {
        if (!item.id) {
            PlaceService.create({
                name: item.name,
                address: item.address,
                country: item.country
            }).then(
                function(response) {
                    $scope.places.push(response.data);
                    AlertifyService.success('Ort gespeichert');
                }
            );
        } else {
            PlaceService.update(item.id, {
                name: item.name,
                address: item.address,
                country: item.country
            }).then(
                function() {
                    AlertifyService.success('Ort gespeichert');
                }
            );
        }
    };

    $scope.removePlace = function(item) {
        if (item.id) {
            PlaceService.delete(item.id).then(
                function() {
                    var newPlaces = [];
                    var place;
                    for (var i = 0; i < $scope.places.length; i++) {
                        place = $scope.places[i];
                        if (place.id != item.id) {
                            newPlaces.push(place);
                        }
                    }
                    $scope.places = newPlaces;

                    AlertifyService.success('Ort gelöscht');
                }
            );
        }
    };

    $scope.saveTag = function(item) {
        if (!item.id) {
            TagService.create({
                name: item.name
            }).then(
                function(response) {
                    $scope.tags.push(response.data);
                    AlertifyService.success('Tag gespeichert');
                }
            );
        } else {
            TagService.update(item.id, {
                name: item.name
            }).then(
                function() {
                    AlertifyService.success('Tag gespeichert');
                }
            );
        }
    };

    $scope.removeTag = function(item) {
        if (item.id) {
            TagService.delete(item.id).then(
                function() {
                    var newTags = [];
                    var tag;
                    for (var i = 0; i < $scope.tags.length; i++) {
                        tag = $scope.tags[i];
                        if (tag.id != item.id) {
                            newTags.push(tag);
                        }
                    }
                    $scope.tags = newTags;

                    AlertifyService.success('Tag gelöscht');
                }
            );
        }
    };
});