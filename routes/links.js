var models = require('../models');
var imageService = require('../services/imageService');

module.exports = function(app) {

    app.post('/api/links', function (req, res) {
        imageService.addPerson(req.body).then(
            function(link) {
                res.json(link);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.delete('/api/links/:imageId/:personId', function (req, res) {
        imageService.removePerson(req.params.imageId, req.params.personId).then(
            function(link) {
                res.json(link);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

};