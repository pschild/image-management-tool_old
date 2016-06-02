imt.directive('searchArea', function($compile) {
    return {
        scope: {
            title: '@',
            model: '=',
            handleAreaUpdate: '&'
        },
        templateUrl: 'views/search/searchArea.html',
        link: function(scope, $element, $attrs) {
            scope.rows = [];

            scope.addRow = function() {
                $compile('<search-row model="model" on-add-row="addRow()" on-remove-row="removeRow(uuid)" on-change="onChange(formData)"></search-row>')(scope).insertAfter($element.find('search-row').last());
                scope.updateRowButtons();

                scope.handleAreaUpdate({
                    model: scope.model,
                    areaRows: scope.rows
                });
            };

            scope.removeRow = function(uuid) {
                scope.rows = scope.rows.filter(function(row) {
                    return row.uuid != uuid;
                });
                scope.updateRowButtons();

                scope.handleAreaUpdate({
                    model: scope.model,
                    areaRows: scope.rows
                });
            };

            scope.onChange = function(formData) {
                var found = false;

                scope.rows.forEach(function(row) {
                    if (row.uuid == formData.uuid) {
                        found = true;
                    }
                });

                if (!found) {
                    scope.rows.push(formData);
                }

                scope.handleAreaUpdate({
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