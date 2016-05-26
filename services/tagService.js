'use strict';

var models = require('../models');

module.exports = {
    findAll: function () {
        return models.Tag.findAll();
    },

    findById: function (id) {
        return models.Tag.findById(id);
    },

    findByName: function (name) {
        return models.Tag.findOne({
            where: {
                name: name
            }
        });
    },

    create: function (data) {
        return models.Tag.create(data);
    },

    update: function (id, data) {
        return models.Tag.update(data, { where: { id: id }});
    },

    removeById: function (id) {
        return models.Tag.findById(id)
            .then(function (tag) {
                if (!tag) {
                    throw new Error('Could not find tag with id ' + id);
                }

                return tag.destroy();
            });
    }
};