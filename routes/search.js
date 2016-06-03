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

                    if (fieldType == 'text' && field.text != '') {
                        text = field.text;
                        textParts = text.split(',');

                        // preparation of where object
                        sql[areaKey] = sql[areaKey] || {};
                        sql[areaKey].where = sql[areaKey].where || {};
                        sql[areaKey].where[fieldName] = sql[areaKey].where[fieldName] || {};

                        // one keyword
                        if (textParts.length == 1) {
                            sql[areaKey].where[fieldName]['$like'] = '%' + textParts[0] + '%';

                        // more than one keyword
                        } else {
                            operation = field.operation; // 'and' || 'or'

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
                        }

                    } else if (fieldType == 'date') {
                        date = new Date(field.date.value);
                        dateCompareMethod = field.date.compareMethod.type; // 'equals' || 'before' || 'after'

                        // preparation of where object
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

        var includes = generateIncludes(sql);

        models.Image.findAll({
            where: sql.image ? sql.image.where : {},
            include: includes
        }).then(function(images) {
            res.json({result: images});
        });
    });

    function generateIncludes(sql) {
        var includes = [];

        if (sql.person) {
            includes.push({
                model: models.Person,
                where: sql.person.where
            });
        }

        if (sql.place) {
            includes.push({
                model: models.Place,
                where: sql.place.where
            });
        }

        if (sql.tag) {
            includes.push({
                model: models.Tag,
                where: sql.tag.where
            });
        }

        return includes;
    }
};