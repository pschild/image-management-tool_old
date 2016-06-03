var models = require('../models');
var imageService = require('../services/imageService');

module.exports = function(app) {

    app.get('/api/test', function (req, res) {
//        models.Image.findAll({
//            include: [
//                { model: models.Place, where: { name: { $like: '%uis%' } } },
//                { model: models.Tag, where: { name: { $like: '%int%' } } },
//                { model: models.Person, where: { name: { $like: '%udit%' } } }
//            ]
//        }).then(function(images) {
//            res.json({images: images});
//        });

        models.Image.findAll({
//            where: {
//                shotAt: {
//                    $like: '%2015'
//                }
//            },
            include: [
                {
                    model: models.Place,
                    where: {
                        name: {
                            $or: [
                                { $like: '%Kleve%' },
                                { $like: '%Schneppenbaum%' }
                            ]
                        },
                        address: {
                            $and: [
                                { $like: '%xxx%' },
                                { $like: '%yyy%' }
                            ]
                        }
                    }
                },
                {
                    model: models.Tag,
                    where: {
                        name: {
                            $and: [
                                { $like: '%Geburtstag%' },
                                { $like: '%Sommer%' }
                            ]
                        }
                    }
                },
                {
                    model: models.Person,
                    where: {
                        name: {
                            $or: [
                                { $like: '%Fynn%' },
                                { $like: '%Milla%' }
                            ]
                        }
                    }
                }
            ]
        }).then(function(images) {
            res.json({images: images});
        });

        return;

        models.Image.findById(11/*, { include: [models.Place] }*/).then(function(image) {
            // pass the place id directly to the setter ...
            /*image.setPlace(3);
            image.save().then(function() {
                res.json(image);
            });*/


            // ... or pass a model (got by e.g. create() or findOne()) to the setter
            /*models.Place.create({
                name: 'My New Place'
            }).then(function(createdPlace) {
                image.setPlace(createdPlace);
                image.save().then(function() {
                    res.json(image);
                });
            });*/

            image.set({
                name: 'AAA1',
                comment: 'BBB1'
            });
            image.setPlace(3);
            image.save().then(function() {
                res.json(image);
            });
        });
    });

    app.get('/api/images', function (req, res) {
        imageService.findAll().then(
            function(images) {
                res.json(images);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.get('/api/images/:id', function (req, res) {
        imageService.findById(req.params.id).then(
            function(image) {
                res.json(image);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.post('/api/images', function (req, res) {
        imageService.create(req.body).then(
            function(image) {
                res.json(image);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.put('/api/images', function (req, res) {
        imageService.update(req.body).then(
            function(image) {
                res.json(image);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

    app.delete('/api/images/:id', function (req, res) {
        imageService.removeById(req.params.id).then(
            function(image) {
                res.json(image);
            },
            function(err) {
                res.json({success: false, error: err.message});
            }
        );
    });

};