var models = require('../models');
var placeService = require('../services/placeService');

module.exports = function(app) {

    app.get('/api/places', function (req, res) {
        placeService.findAll().then(
            function(places) {
                res.json(places);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.get('/api/places/:id', function (req, res) {
        placeService.findById(req.params.id).then(
            function(place) {
                res.json(place);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.post('/api/places', function (req, res) {
        placeService.create(req.body).then(
            function(place) {
                res.json(place);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.put('/api/places/:id', function (req, res) {
        placeService.update(req.params.id, {
            name: req.body.name,
            address: req.body.address,
            country: req.body.country
        }).then(
            function(place) {
                res.json(place);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.delete('/api/places/:id', function (req, res) {
        placeService.removeById(req.params.id).then(
            function(place) {
                res.json(place);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

};