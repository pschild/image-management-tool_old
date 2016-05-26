'use strict';

var models = require('../models');

module.exports = {
    findAll: function () {
        return models.Place.findAll();
    },

    findById: function (id) {
        return models.Place.findById(id);
    },

    create: function (data) {
        return models.Place.create(data);
    },

    update: function (id, data) {
        return models.Place.update(data, { where: { id: id }});
    },

    removeById: function (id) {
        return models.Place.findById(id)
            .then(function (place) {
                if (!place) {
                    throw new Error('Could not find place with id ' + id);
                }

                return place.destroy();
            });
    }
};