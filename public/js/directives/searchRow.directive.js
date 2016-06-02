imt.directive('searchRow', function() {
    return {
        scope: {
            model: '=',
            onAddRow: '&',
            onRemoveRow: '&',
            onChange: '&'
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
                scope.onAddRow();
            };

            scope.removeRow = function(uuid) {
                $element.remove();
                scope.onRemoveRow({
                    uuid: scope.uuid
                });
            };

            scope.$watchCollection('formData', function() {
                scope.onChange({ formData: scope.formData });
            });
        }
    }
});
