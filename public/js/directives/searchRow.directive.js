imt.directive('searchRow', function() {
    return {
        scope: {
            model: '=',
            onRowAdd: '&',
            onRowRemove: '&',
            onRowChange: '&'
        },
        templateUrl: 'views/search/searchRow.html',
        link: function(scope, $element, $attrs) {
            scope.uuid = _.uniqueId('search-row-');

            scope.operations = ['UND', 'ODER'];
            scope.fields = scope.model.fields;

            scope.formData = {
                uuid: scope.uuid,
                operation: scope.operations[0],
                field: scope.fields[0],
                text: '',
                date: new Date()
            };

            scope.addRow = function() {
                $element.find('.add-row-button').hide();
                scope.onRowAdd();
            };

            scope.removeRow = function(uuid) {
                $element.remove();
                scope.onRowRemove({
                    uuid: scope.uuid
                });
            };

            scope.$watchCollection('formData', function() {
                scope.onRowChange({ formData: scope.formData });
            });
        }
    }
});
