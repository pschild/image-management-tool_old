imt.directive('searchForm', function($compile, $http) {
    return {
        scope: {},
        templateUrl: 'views/search/searchForm.html',
        link: function(scope, $element, $attrs) {
            scope.fields = [];

            scope.updateRowButtons = function() {
                $element.find('search-row:first-of-type .remove-row-button').hide();
                $element.find('search-row:first-of-type .and-label').hide();
                $element.find('search-row:last-of-type .add-row-button').show();
            };

            scope.addRow = function() {
                $compile('<search-row type="text" on-add-row="addRow()" on-remove-row="removeRow(uuid)" on-change="onChange(data)"></search-row>')(scope).insertAfter($element.find('search-row').last());
                scope.updateRowButtons();
            };

            scope.removeRow = function(uuid) {
                scope.fields = scope.fields.filter(function(field) {
                    return field.uuid != uuid;
                });
                scope.updateRowButtons();
            };

            scope.onChange = function(data) {
                var found = false;
                scope.fields.forEach(function(field) {
                    if (field.uuid == data.uuid) {
                        field = data;
                        found = true;
                    }
                });

                if (!found) {
                    scope.fields.push(data);
                }
            };

            scope.startSearch = function() {
                $http.get('/api/search', {
                        params: {
                            fields: scope.fields
                        }
                    })
                    .then(function(response) {
                        scope.results = response.data.result;
                    });
            };
        }
    }
});
