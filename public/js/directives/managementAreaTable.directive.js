imt.directive('managementAreaTable', function() {
    return {
        scope: {
            data: '=',
            template: '@',
            onEditClicked: '&',
            onRemoveClicked: '&'
        },
        templateUrl: 'views/management/managementAreaTable.html',
        link: function(scope, $element, $attrs) {
            scope.sortType = 'name';
            scope.sortReverse = false;
            scope.keyword = '';

            scope.editItem = function(item) {
                scope.onEditClicked({
                    item: item
                });
            };

            scope.removeItem = function(item) {
                scope.onRemoveClicked({
                    item: item
                });
            };
        }
    }
});
