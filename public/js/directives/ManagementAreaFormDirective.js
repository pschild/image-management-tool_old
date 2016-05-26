imt.directive('managementAreaForm', function() {
    return {
        scope: {
            item: '=',
            template: '@',
            onCancelEditClicked: '&'
        },
        templateUrl: 'views/management/managementAreaForm.html',
        link: function(scope, $element, $attrs) {
            scope.cancelEdit = function() {
                scope.onCancelEditClicked();
            };
        }
    }
});
