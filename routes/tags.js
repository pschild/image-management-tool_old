var models = require('../models');
var tagService = require('../services/tagService');

module.exports = function(app) {

    app.get('/api/tags', function (req, res) {
        tagService.findAll().then(
            function(tags) {
                res.json(tags);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.get('/api/tags/:id', function (req, res) {
        tagService.findById(req.params.id).then(
            function(tag) {
                res.json(tag);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.get('/api/tags/name/:name', function (req, res) {
        tagService.findByName(req.params.name).then(
            function(tag) {
                res.json(tag);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.post('/api/tags', function(req, res) {
        tagService.create(req.body).then(
            function(tag) {
                res.json(tag);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.put('/api/tags/:id', function (req, res) {
        tagService.update(req.params.id, {
            name: req.body.name
        }).then(
            function(tag) {
                res.json(tag);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.delete('/api/tags/:id', function (req, res) {
        tagService.removeById(req.params.id).then(
            function(tag) {
                res.json(tag);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });
};