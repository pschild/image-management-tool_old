imt.factory('AlertifyService', function () {
    alertify.defaults.transition = 'zoom';

    alertify.defaults.theme.ok = 'btn btn-primary';
    alertify.defaults.theme.cancel = 'btn btn-danger';
    alertify.defaults.theme.input = 'form-control';

    return {
        confirm: function(title, message, callback) {
            alertify.confirm(message, callback).set({
                title: title,
                labels: {ok: 'Ja', cancel: 'Nein'}
            }).show();
        },

        alert: function(title, message, okCallback) {
            alertify.alert(title, message, okCallback);
        },

        notify: function(message, type, duration, callback) {
            alertify.notify(message, type, duration, callback);
        },

        success: function(message, duration, callback) {
            this.notify(message, 'success', duration, callback);
        },

        error: function(message, duration, callback) {
            this.notify(message, 'error', duration, callback);
        },

        warning: function(message, duration, callback) {
            this.notify(message, 'warning', duration, callback);
        },

        info: function(message, duration, callback) {
            this.notify(message, null, duration, callback);
        }
    }
});