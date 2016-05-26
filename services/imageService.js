'use strict';

var promisedFs = require('promised-io/fs');
var path = require('path');
var models = require('../models');

var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var UPLOAD_DIR = config.uploadDir;

module.exports = {
    findAll: function () {
        return models.Image.findAll({include: [models.Place]});
    },

    findById: function (id) {
        return models.Image.findById(id, {include: [models.Place, models.Tag, models.Person]});
    },

    create: function (data) {
        return models.Image.create(data);
    },

    update: function (data) {
        return models.Image.findById(data.id, {include: [models.Person]})
            .then(function (image) {
                image.set(data);
                image.setPlace(models.Place.build(data.Place));
                image.setTags(models.Tag.build(data.Tags));

                return image.save();
            });
    },

    addPerson: function (data) {
        return models.Image.findById(data.imageId)
            .then(function (image) {
                image.addPerson(models.Person.build(data.linkObject), {
                    x: data.linkObject.Link.x,
                    y: data.linkObject.Link.y
                });

                return image.save();
            });

    },

    removePerson: function (imageId, personId) {
        return models.Image.findById(imageId)
            .then(function (image) {
                image.removePerson(personId);
                return image.save();
            });
    },

    removeById: function (id) {
        var self = this;
        var loadedImage;

        return models.Image.findById(id)
            .then(function (image) {
                if (!image) {
                    throw new Error('Could not find image with id ' + id);
                }

                loadedImage = image;
                return image.destroy();
            })
            .then(function (affectedRows) {
                var imageName = loadedImage.name + '.' + loadedImage.suffix;
                self.removeImageFromFileSystem(loadedImage.path, imageName);
            });
    },

    removeImageFromFileSystem: function (imagePath, imageName) {
        console.log('removeImageFromFileSystem', imagePath, imageName);
        return promisedFs.unlink(path.join(UPLOAD_DIR, imagePath, imageName));
    }
};