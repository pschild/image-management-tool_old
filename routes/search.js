var all = require('promised-io/promise').all;

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

        var fields = req.query.fields;
        var field;

        var personNames = [];
        var placeNames = [];
        var shotAtDate = undefined;

        // one filter
        if (typeof fields == 'string') {
            field = JSON.parse(fields);
            switch (field.model.attr) {
                case 'personName':
                    personNames.push(field.search);
                    break;
                case 'placeName':
                    placeNames.push(field.search);
                    break;
                case 'shotAtDate':
                    shotAtDate = new Date(field.shotAt);
                    break;
            }

        // more than one filter
        } else if (typeof fields == 'object') {
            fields.forEach(function(fieldString) {
                field = JSON.parse(fieldString);
                switch (field.model.attr) {
                    case 'personName':
                        personNames.push(field.search);
                        break;
                    case 'placeName':
                        placeNames.push(field.search);
                        break;
                    case 'shotAtDate':
                        shotAtDate = new Date(field.shotAt);
                        break;
                }
            });

        } else {
            console.error('Could not read fields.');
        }

        models.Image.findAll({
            include: [
                {
                    model: models.Place,
                    where: {
                        name: {
                            $in: placeNames
                        }
                    }
                }
            ]
        }).then(function(images) {
            images.forEach(function(image) {
                console.log(image.name);
            });

            res.json({result: images});
        });

//        imageService.findWherePersonNamesIn(personNames);
//        imageService.findWherePlaceNamesIn(placeNames);
//        imageService.findWhereShotAtDateEquals(shotAtDate);
    });

};