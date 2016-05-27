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
                function(response) {
                    $scope.persons.push(response.data);
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
                    var newPersons = [];
                    var person;
                    for (var i = 0; i < $scope.persons.length; i++) {
                        person = $scope.persons[i];
                        if (person.id != item.id) {
                            newPersons.push(person);
                        }
                    }
                    $scope.persons = newPersons;
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
                    var newPlaces = [];
                    var place;
                    for (var i = 0; i < $scope.places.length; i++) {
                        place = $scope.places[i];
                        if (place.id != item.id) {
                            newPlaces.push(place);
                        }
                    }
                    $scope.places = newPlaces;
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
                    var newTags = [];
                    var tag;
                    for (var i = 0; i < $scope.tags.length; i++) {
                        tag = $scope.tags[i];
                        if (tag.id != item.id) {
                            newTags.push(tag);
                        }
                    }
                    $scope.tags = newTags;
                }
            );
        }
    };
});