imt.directive('managementArea', function() {
    return {
        scope: {
            data: '=',
            title: '@',
            template: '@',
            handleUpdate: '&onUpdate',
            handleRemove: '&onRemove'
        },
        templateUrl: 'views/managementArea.html',
        link: function(scope, $element, $attrs) {
            scope.addMode = false;

            scope.$watch('data', function(value) {
                if (value) {
                    scope.selectedItem = scope.data[0];
                }
            });

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

            scope.enableAddMode = function() {
                scope.addMode = true;
                scope.selectedItem = {};
            };

            scope.disableAddMode = function() {
                scope.addMode = false;
            };
        }
    }
});
