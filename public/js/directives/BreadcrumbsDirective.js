imt.directive('breadcrumbs', function($stateParams) {
    return {
        scope: {},
        templateUrl: 'views/breadcrumbs.html',
        link: function(scope, $element, $attrs) {
            var currentFolderPath = $stateParams.path;
            scope.breadcrumbs = generateBreadcrumbsFromCurrentPath(currentFolderPath.split('/'));

            function generateBreadcrumbsFromCurrentPath(pathElements) {
                var result = [];
                var href = '#/files';
                pathElements.forEach(function(item) {
                    href += '/' + item;

                    result.push({
                        label: item,
                        href: href
                    });
                });

                return result;
            }
        }
    }
});
