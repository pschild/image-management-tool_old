imt.component('searchRow1', {
    bindings: {
        model: '='
    },
    templateUrl: 'views/search/searchRow1.html',
    controller: function SearchRowController() {
        this.operations = ['UND', 'ODER'];
        this.selectedOperation = null;

        this.selectedField = null;
    }
});