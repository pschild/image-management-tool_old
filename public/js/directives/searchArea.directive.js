imt.directive('searchArea', function($compile) {
    return {
        scope: {
            title: '@',
            model: '=',
            onAreaChange: '&'
        },
        templateUrl: 'views/search/searchArea.html',
        link: function(scope, $element, $attrs) {
            scope.rows = [];

            scope.addRow = function() {
                $compile('<search-row model="model" on-row-add="addRow()" on-row-remove="removeRow(uuid)" on-row-change="onRowChange(formData)"></search-row>')(scope).insertAfter($element.find('search-row').last());
                scope.updateRowButtons();

                scope.onAreaChange({
                    model: scope.model,
                    areaRows: scope.rows
                });
            };

            scope.removeRow = function(uuid) {
                scope.rows = scope.rows.filter(function(row) {
                    return row.uuid != uuid;
                });
                scope.updateRowButtons();

                scope.onAreaChange({
                    model: scope.model,
                    areaRows: scope.rows
                });
            };

            scope.onRowChange = function(formData) {
                var found = false;

                scope.rows.forEach(function(row) {
                    if (row.uuid == formData.uuid) {
                        found = true;
                    }
                });

                if (!found) {
                    scope.rows.push(formData);
                }

                scope.onAreaChange({
                    model: scope.model,
                    areaRows: scope.rows
                });
            };

            scope.updateRowButtons = function() {
                $element.find('search-row:first-of-type .remove-row-button').hide();
                $element.find('search-row:last-of-type .add-row-button').show();
            };
        }
    }
});