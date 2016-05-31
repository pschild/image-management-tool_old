var _ = require('underscore');

var models = require('../models');
var imageService = require('../services/imageService');

module.exports = function(app) {

    app.get('/api/search', function (req, res) {
        //console.log(req.query.fields);
        /* EXAMPLE FIELDS:
         [
             '{"uuid":"search-row-1","model":{"name":"Person","attr":"personName","type":"text"},"search":"philippe","shotAt":"2016-05-30T14:11:12.856Z"}',
             '{"uuid":"search-row-2","model":{"name":"Ort","attr":"placeName","type":"text"},"search":"kleve","shotAt":"2016-05-30T14:11:20.036Z"}',
             '{"uuid":"search-row-3","model":{"name":"Aufnahmedatum","attr":"shotAtDate","type":"date"},"search":"","shotAt":"2016-05-04T14:11:23.927Z"}'
         ]
        */

        // ensure that we have an array of fields, even if only one field is given:
        var fields = typeof req.query.fields == 'string' ? [req.query.fields] : req.query.fields;

        var personNames = [];
        var placeNames = [];
        var tagNames = [];
        var shotAtDate = undefined;

        var field;
        fields.forEach(function(fieldString) {
            field = JSON.parse(fieldString);
            switch (field.model.attr) {
                case 'personName':
                    if (field.search != '') {
                        personNames.push(field.search);
                    }
                    break;
                case 'placeName':
                    if (field.search != '') {
                        placeNames.push(field.search);
                    }
                    break;
                case 'tagName':
                    if (field.search != '') {
                        tagNames.push(field.search);
                    }
                    break;
                case 'shotAtDate':
                    shotAtDate = new Date(field.shotAt);
                    break;
            }
        });

        models.Image.findAll({include: [models.Place, models.Tag, models.Person]})
            .then(function(images) {
                var resultImages = images;

                resultImages = findWherePlaceAttrsIn(resultImages, placeNames);
                resultImages = findWherePersonAttrsIn(resultImages, personNames);
                resultImages = findWhereTagAttrsIn(resultImages, tagNames);
                resultImages = findWhereShotAtDateEquals(resultImages, shotAtDate);

                res.json({result: resultImages});
            });
    });

    var findWherePlaceAttrsIn = function(images, criteria) {
        // if we have no criteria given, return the images as they are:
        if (!criteria || criteria.length == 0) {
            return images;
        }

        return _.filter(images, function(image) {
            // don't return images that don't have the property set:
            if (!image.Place) {
                return false;
            }

            var result = false;
            var regex;

            // OR-logic, case INsensitive
            criteria.forEach(function(criterion) {
                regex = new RegExp(criterion, 'i')
                if (
                    image.Place.name.search(regex) >= 0
                    || image.Place.address.search(regex) >= 0
                    || image.Place.country.search(regex) >= 0
                ) {
                    result = true;
                }
            });

            return result;
        });
    };

    var findWherePersonAttrsIn = function(images, criteria) {
        // if we have no criteria given, return the images as they are:
        if (!criteria || criteria.length == 0) {
            return images;
        }

        return _.filter(images, function(image) {
            // don't return images that don't have the property set:
            if (!image.People || image.People.length == 0) {
                return false;
            }

            var result = false;
            var regex;

            // OR-logic, case INsensitive
            image.People.forEach(function(person) {
                criteria.forEach(function(criterion) {
                    regex = new RegExp(criterion, 'i');
                    if (
                        person.name.search(regex) >= 0
                    ) {
                        result = true;
                    }
                });
            });

            return result;
        });
    };

    var findWhereTagAttrsIn = function(images, criteria) {
        // if we have no criteria given, return the images as they are:
        if (!criteria || criteria.length == 0) {
            return images;
        }

        return _.filter(images, function(image) {
            // don't return images that don't have the property set:
            if (!image.Tags || image.Tags.length == 0) {
                return false;
            }

            var result = false;
            var regex;

            // OR-logic, case INsensitive
            image.Tags.forEach(function(tag) {
                criteria.forEach(function(criterion) {
                    regex = new RegExp(criterion, 'i');
                    if (
                        tag.name.search(regex) >= 0
                    ) {
                        result = true;
                    }
                });
            });

            return result;
        });
    };

    var findWhereShotAtDateEquals = function(images, shotAtDate) {
        // if we have no criteria given, return the images as they are:
        if (!shotAtDate) {
            return images;
        }

        return _.filter(images, function(image) {
            // don't return images that don't have the property set:
            if (!image.shotAt) {
                return false;
            }

            return image.shotAt.getDate() == shotAtDate.getDate()
                && image.shotAt.getMonth() == shotAtDate.getMonth()
                && image.shotAt.getFullYear() == shotAtDate.getFullYear();
        });
    };

};