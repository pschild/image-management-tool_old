imt.directive('imageMarker', function($timeout, PersonService, LinkService, AlertifyService) {
    return {
        scope: {
            image: '='
        },
        templateUrl: 'views/imageMarker.html',
        link: function(scope, $element, $attrs) {
            var self = this;

            scope.markerWidth = 50;
            scope.markerHeight = 50;
            scope.person = null;
            scope.editMode = false;
            scope.availablePersons = [];

            PersonService.getAll().then(function(response) {
                scope.allPersons = response.data;
                self.updateAvailablePersons();
            });

            var $imageMarkerContainer = $element.find('#image-marker-container');
            var $markerLayer = $element.find('#marker-layer');
            var $markerForm = $element.find('#marker-form');

            $markerLayer.bind('click', function(event) {
                if ($(event.target).is('#marker-layer')) {
                    var x = event.pageX - $imageMarkerContainer.offset().left;
                    var y = event.pageY - $imageMarkerContainer.offset().top;

                    scope.leftPercent = x / $imageMarkerContainer.width() * 100;
                    scope.topPercent = y / $imageMarkerContainer.height() * 100;

                    self.showMarkerForm(scope.leftPercent, scope.topPercent);
                    scope.$apply(function() {
                        scope.editMode = true;
                    });
                }
            });

            this.showMarkerForm = function(x, y) {
                $markerForm.css({
                    left: 'calc(' + x + '% - ' + (scope.markerWidth / 2) + 'px)',
                    top: 'calc(' + y + '% - ' + (scope.markerHeight / 2) + 'px)'
                });
                $timeout(function() {
                    $markerForm.find('input').focus();
                });
            };

            this.updateAvailablePersons = function() {
                if (!scope.image.People || scope.image.People.length == 0) {
                    scope.availablePersons = scope.allPersons;
                    return;
                }

                scope.availablePersons = [];

                // persons that are already chosen and marked on the image shouldn't be suggested in the dropdown.
                scope.allPersons.forEach(function(person) {
                    var result = scope.image.People.filter(function(linkedPerson) {
                        return person.id == linkedPerson.id;
                    });

                    if (result.length == 0) {
                        scope.availablePersons.push(person);
                    }
                });
            };

            scope.save = function() {
                if (scope.person && scope.person.id) {
                    if (!scope.image.People) {
                        scope.image.People = [];
                    }

                    var linkObject = scope.person;
                    linkObject.Link = {
                        imageId: scope.image.id,
                        personId: scope.person.id,
                        x: scope.leftPercent,
                        y: scope.topPercent
                    };

                    scope.image.People.push(linkObject);

                    LinkService.add(scope.image.id, linkObject).then(function() {
                        AlertifyService.success('Verlinkung gespeichert');

                        scope.person = null;
                        scope.editMode = false;
                        self.updateAvailablePersons();
                    });
                } else {
                    AlertifyService.alert('Hinweis', 'Sie haben eine unbekannte Person hinterlegt.');
                }
            };

            scope.cancel = function() {
                scope.editMode = false;
            };

            scope.removeLink = function(removedPerson) {
                LinkService.remove(removedPerson.Link).then(function() {
                    AlertifyService.success('Verlinkung entfernt');

                    scope.image.People = scope.image.People.filter(function(linkedPerson) {
                        return linkedPerson.id != removedPerson.id;
                    });
                    self.updateAvailablePersons();
                });
            };
        }
    }
});