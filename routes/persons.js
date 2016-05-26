var models = require('../models');
var personService = require('../services/personService');

module.exports = function(app) {

    app.get('/api/persons', function (req, res) {
        personService.findAll().then(
            function(persons) {
                res.json(persons);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.get('/api/persons/:id', function (req, res) {
        personService.findById(req.params.id).then(
            function(person) {
                res.json(person);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.post('/api/persons', function (req, res) {
        personService.create(req.body).then(
            function(person) {
                res.json(person);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.put('/api/persons/:id', function (req, res) {
        personService.update(req.params.id, {
            name: req.body.name,
            birthday: req.body.birthday
        }).then(
            function(person) {
                res.json(person);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.delete('/api/persons/:id', function (req, res) {
        personService.removeById(req.params.id).then(
            function(person) {
                res.json(person);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

};