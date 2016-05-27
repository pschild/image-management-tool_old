imt.directive('managementAreaForm', function() {
    return {
        scope: {
            item: '=',
            template: '@',
            onCancelEditClicked: '&',
            onSaveItemClicked: '&'
        },
        templateUrl: 'views/management/managementAreaForm.html',
        link: function(scope, $element, $attrs) {
            scope.saveItem = function() {
                scope.onSaveItemClicked({
                    item: scope.item
                });
            };

            scope.cancelEdit = function() {
                scope.onCancelEditClicked();
            };
        }
    }
});
