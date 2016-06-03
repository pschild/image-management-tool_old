var _ = require('underscore');

var models = require('../models');
var imageService = require('../services/imageService');

module.exports = function(app) {

    app.get('/api/search', function (req, res) {
        var areaKeys = JSON.parse(req.query.areas);
        var area;
        var fieldType, fieldName, text, textParts, operation, date, dateCompareMethod;

        var sql = {};

        // for each area:
        Object.keys(areaKeys).forEach(function(areaKey) {
            area = areaKeys[areaKey];
            if (area) {
                // for each field in an area:
                area.forEach(function(field) {
                    fieldType = field.field.type; // 'text' || 'date'
                    fieldName = field.field.name; // column name

                    if (fieldType == 'text') {
                        text = field.text;
                        textParts = text.split(',');
                        operation = field.operation; // 'and' || 'or'

                        sql[areaKey] = sql[areaKey] || {};
                        sql[areaKey].where = sql[areaKey].where || {};
                        sql[areaKey].where[fieldName] = sql[areaKey].where[fieldName] || {};

                        if (operation == 'and') {
                            if (!sql[areaKey].where[fieldName]['$and']) {
                                sql[areaKey].where[fieldName]['$and'] = [];
                            }

                            textParts.forEach(function(textPart) {
                                sql[areaKey].where[fieldName]['$and'].push({ $like: '%' + textPart + '%' });
                            });
                        } else if (operation == 'or') {
                            if (!sql[areaKey].where[fieldName]['$or']) {
                                sql[areaKey].where[fieldName]['$or'] = [];
                            }

                            textParts.forEach(function(textPart) {
                                sql[areaKey].where[fieldName]['$or'].push({ $like: '%' + textPart + '%' });
                            });
                        }

                    } else if (fieldType == 'date') {
                        date = new Date(field.date.value);
                        dateCompareMethod = field.date.compareMethod.type; // 'equals' || 'before' || 'after'

                        sql[areaKey] = sql[areaKey] || {};
                        sql[areaKey].where = sql[areaKey].where || {};
                        sql[areaKey].where[fieldName] = sql[areaKey].where[fieldName] || {};

                        switch (dateCompareMethod) {
                            case 'equals':
                                sql[areaKey].where[fieldName] = date;
                                break;
                            case 'before':
                                sql[areaKey].where[fieldName]['$lt'] = date;
                                break;
                            case 'after':
                                sql[areaKey].where[fieldName]['$gt'] = date;
                                break;
                        }
                    }
                });
            }
        });

        models.Image.findAll({
            where: sql.image ? sql.image.where : {},
            include: [
                {
                    model: models.Person,
                    where: sql.person ? sql.person.where : {}
                }
            ]
        }).then(function(images) {
            res.json({result: images});
        });

//        var fields = typeof req.query.fields == 'string' ? [req.query.fields] : req.query.fields;
//
//        var personNames = [];
//        var placeNames = [];
//        var tagNames = [];
//        var shotAtDate = undefined;
//
//        var field;
//        fields.forEach(function(fieldString) {
//            field = JSON.parse(fieldString);
//            switch (field.model.attr) {
//                case 'personName':
//                    if (field.search != '') {
//                        personNames.push(field.search);
//                    }
//                    break;
//                case 'placeName':
//                    if (field.search != '') {
//                        placeNames.push(field.search);
//                    }
//                    break;
//                case 'tagName':
//                    if (field.search != '') {
//                        tagNames.push(field.search);
//                    }
//                    break;
//                case 'shotAtDate':
//                    shotAtDate = new Date(field.shotAt);
//                    break;
//            }
//        });
//
//        models.Image.findAll({include: [models.Place, models.Tag, models.Person]})
//            .then(function(images) {
//                var resultImages = images;
//
//                resultImages = findWherePlaceAttrsIn(resultImages, placeNames);
//                resultImages = findWherePersonAttrsIn(resultImages, personNames);
//                resultImages = findWhereTagAttrsIn(resultImages, tagNames);
//                resultImages = findWhereShotAtDateEquals(resultImages, shotAtDate);
//
//                res.json({result: resultImages});
//            });
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