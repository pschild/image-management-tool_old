imt.component('breadcrumbs', {
    templateUrl: 'views/breadcrumbs.html',
    controller: function BreadcrumbsController($stateParams) {
        this.breadcrumbs = generateBreadcrumbsFromCurrentPath($stateParams.path.split('/'));

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
});