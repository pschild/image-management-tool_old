imt.directive('managementArea', function() {
    return {
        scope: {
            data: '=',
            title: '@',
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
                scope.handleRemove({
                    item: item
                });
                //alertify.confirm('confirm').set({transition:'zoom', message: 'Wirklich löschen?'}).show();
//                alertify.confirm('Sicher?', function() {
//                    console.log(123);
//                }).set({
//                    transition: 'zoom',
//                    message: 'Wirklich löschen?',
//                    labels: {ok: 'Ja', cancel: 'Nein'}
//                }).show();
            };
        }
    }
});
