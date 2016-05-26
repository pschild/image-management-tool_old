imt.directive('managementArea', function() {
    return {
        scope: {
            data: '=',
            title: '@',
            handleUpdate: '&onUpdate',
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

            scope.update = function() {
                scope.handleUpdate({
                    item: scope.selectedItem
                });

                scope.disableAddMode();
            };

            scope.remove = function() {
                //alertify.confirm('confirm').set({transition:'zoom', message: 'Wirklich löschen?'}).show();
                alertify.confirm('Sicher?', function() {
                    console.log(123);
                }).set({
                    transition: 'zoom',
                    message: 'Wirklich löschen?',
                    labels: {ok: 'Ja', cancel: 'Nein'}
                }).show();
                //scope.handleRemove({
                //    item: scope.selectedItem
                //});
            };
        }
    }
});
