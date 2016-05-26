'use strict';

var models = require('../models');

module.exports = {
    findAll: function () {
        return models.Person.findAll();
    },

    findById: function (id) {
        return models.Person.findById(id);
    },

    create: function (data) {
        return models.Person.create(data);
    },

    update: function (id, data) {
        return models.Person.update(data, { where: { id: id }});
    },

    removeById: function (id) {
        return models.Person.findById(id)
            .then(function (person) {
                if (!person) {
                    throw new Error('Could not find person with id ' + id);
                }

                return person.destroy();
            });
    }
};