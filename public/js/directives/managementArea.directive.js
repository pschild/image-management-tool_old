imt.directive('managementArea', function(AlertifyService) {
    return {
        scope: {
            data: '=',
            type: '@',
            handleSave: '&onSave',
            handleRemove: '&onRemove'
        },
        templateUrl: 'views/managementArea.html',
        link: function(scope, $element, $attrs) {
            scope.editMode = false;

            scope.handleEditClicked = function(item) {
                scope.selectedItem = item;
                scope.editMode = true;
            };

            scope.handleCancelEditClicked = function() {
                scope.editMode = false;
            };

            scope.handleSaveItemClicked = function(item) {
                scope.handleSave({
                    item: item
                });

                scope.editMode = false;
            };

            scope.handleRemoveItemClicked = function(item) {
                AlertifyService.confirm('Eintrag löschen', 'Sind Sie sich, dass Sie den ausgewählten Eintrag löschen wollen?', function() {
                    scope.handleRemove({
                        item: item
                    });
                });
            };
        }
    }
});
