imt.directive('navigation', function($location) {
    return {
        scope: {},
        templateUrl: 'views/navigation.html',
        link: function(scope, $element, $attrs) {
            scope.brandItem = {
                label: 'IMT',
                url: '/#/files'
            };

            scope.mainItems = [
                { label: 'Bilder', url: '/#/files' },
                { label: 'Verwaltung', url: '/#/management' },
                { label: 'Suche', url: '/#/search' }
            ];

            scope.secondaryItems = [
                { label: 'Impressum', url: '/#/imprint' }
            ];

            scope.isCurrentPath = function(url) {
                // determine the active nav item by investigating the current $location.path():
                return url.match(/[a-z]+/)[0] == $location.path().match(/[a-z]+/)[0];
            };
        }
    }
});
