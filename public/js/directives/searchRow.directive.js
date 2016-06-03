imt.directive('searchRow', function() {
    return {
        scope: {
            model: '=',
            onRowRemove: '&',
            onRowChange: '&'
        },
        templateUrl: 'views/search/searchRow.html',
        link: function(scope, $element, $attrs) {
            if ($element.is(':first-of-type')) {
                $element.find('.connection-label').hide();
            }

            scope.uuid = _.uniqueId('search-row-');

            scope.operations = [
                { description: 'UND', type: 'and' },
                { description: 'ODER', type: 'or' }
            ];

            scope.compareMethods = [
                { description: 'ist', type: 'equals' },
                { description: 'vor', type: 'before' },
                { description: 'nach', type: 'after' }
            ];

            scope.fields = scope.model.fields;

            scope.formData = {
                uuid: scope.uuid,
                operation: scope.operations[0].type,
                field: scope.fields[0],
                text: '',
                date: {
                    compareMethod: scope.compareMethods[0],
                    value: null
                }
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
