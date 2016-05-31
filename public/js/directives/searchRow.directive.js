imt.directive('searchRow', function() {
    return {
        scope: {
            type: '@',
            onAddRow: '&',
            onRemoveRow: '&',
            onChange: '&'
        },
        templateUrl: 'views/search/searchRow.html',
        link: function(scope, $element, $attrs) {
            if ($element.is(':first-of-type')) {
                $element.find('.remove-row-button').hide();
                $element.find('.and-label').hide();
            }

            scope.uuid = _.uniqueId('search-row-');

            scope.models = [
                {name: 'Person', attr: 'personName', type: 'text'},
                {name: 'Ort', attr: 'placeName', type: 'text'},
                {name: 'Tag', attr: 'tagName', type: 'text'},
                {name: 'Aufnahmedatum', attr: 'shotAtDate', type: 'date'}
            ];

            scope.data = {
                uuid: scope.uuid,
                model: scope.models[0],
                search: '',
                shotAt: new Date()
            };

            scope.$watchCollection('data', function() {
                scope.onChange({ data: scope.data });
            });

            scope.addRow = function() {
                $element.find('.add-row-button').hide();
                scope.onAddRow();
            };

            scope.removeRow = function() {
                $element.remove();
                scope.onRemoveRow({
                    uuid: scope.uuid
                });
            };
        }
    }
});
