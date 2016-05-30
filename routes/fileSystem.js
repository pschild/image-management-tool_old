var util = require('util');
var fs = require('fs-extra');
var path = require('path');
var _ = require('underscore');
var randomstring = require('randomstring');
var promisedFs = require('promised-io/fs');
var all = require('promised-io/promise').all;
var when = require('promised-io/promise').when;
var models = require('../models');

var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

var UPLOAD_DIR = config.uploadDir;

module.exports = function (app) {

    app.post('/api/upload', function(req, res) {
        var promises = [];
        var filePaths = req.body.filePaths;
        var currentFolderPath = req.body.currentFolderPath;

        filePaths.forEach(function(filePath) {
            var randomString = randomstring.generate(7);

            var pathParts = filePath.split('\\');
            var fileName = pathParts[pathParts.length - 1];

            var fileNameWithoutExtension = fileName.split('.')[0].replace(' ', '_');
            var fileExtension = fileName.split('.')[1];
            var uploadedFileName = fileNameWithoutExtension + '_' + randomString + '.' + fileExtension.toLowerCase();

            var dest = path.join(UPLOAD_DIR, currentFolderPath, uploadedFileName);
            fs.copy(filePath, dest, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("[INFO] Uploaded: %s as %s", fileName, uploadedFileName);
                }
            });

            promises.push(
                models.Image.create({
                    path: currentFolderPath,
                    name: fileNameWithoutExtension + '_' + randomString,
                    suffix: fileExtension.toLowerCase(),
                    uploaded_at: new Date()
                })
            );
        });

        all(promises).then(
            function() {
                console.log('success', arguments);
                res.json({success: true});
            },
            function(err) {
                console.log('error', arguments);
                res.json({success: false, error: err});
            }
        );
    });

    app.get('/api/folderStructure/:path', function(req, res) {
        var root = UPLOAD_DIR;
        var currentPath = req.params.path;
        var currentFolder = currentPath == 'ROOT' ? root : path.join(root, currentPath);

        try {
            var access = fs.accessSync(currentFolder);
        } catch(e) {
            res.json({
                success: false,
                message: 'Could not find directory ' + currentFolder
            });
            return;
        }

        var folderNames = [];
        var imageNames = [];
        var images = [];
        promisedFs.readdir(currentFolder)
            .then(function(files) {
                var promises = files.map(function(file) {
                    return promisedFs.lstat(path.join(currentFolder, file))
                        .then(function(stat) {
                            if (stat.isFile()) {
                                imageNames.push(file);
                            } else if (stat.isDirectory()) {
                                folderNames.push(file);
                            }
                        });
                });
                return all(promises);
            })
            .then(function() {
                var promises = imageNames.map(function(imageName) {
                    var fileNameWithoutExtension = imageName.split('.')[0];
                    return models.Image.findOne({
                        where: {
                            name: fileNameWithoutExtension
                        }
                    }).then(
                        function(image) {
                            if (image) {
                                images.push(image);
                            }
                        }
                    );
                });
                return all(promises);
            })
            .then(function() {
                res.json({
                    success: true,
                    folderNames: folderNames,
                    images: images
                });
            });
    });

    app.post('/api/folderStructure/newDirectory', function (req, res, next) {
        var currentFolderPath = req.body.currentFolderPath;
        var newDirectoryName = req.body.newDirectoryName;

        var allowedPattern = new RegExp("^[a-zA-Z0-9 ]+$");
        if (!allowedPattern.test(newDirectoryName)) {
            res.json({
                success: false,
                errorMessage: 'Der Ordnername darf nur Buchstaben (keine Umlaute), Zahlen und Leerzeichen enthalten.'
            });
            return;
        }

        fs.mkdir(path.join(UPLOAD_DIR, currentFolderPath, newDirectoryName), '0o777', function(error) {
            if (error) {
                res.json({
                    success: false,
                    errorMessage: error.errno == '-4075' ? 'Ein Ordner mit diesem Namen existiert bereits.' : 'Unbekannter Fehler'
                });
                return;
            }

            res.json({success: true});
        });
    });

    app.delete('/api/folderStructure/removeDirectory', function (req, res, next) {
        var data = JSON.parse(req.query.data);
        var currentFolderPath = data.currentFolderPath || '';
        var directoryName = data.directoryName || '';

        fs.rmdir(path.join(UPLOAD_DIR, currentFolderPath, directoryName), function(error) {
            if (error) {
                res.json({
                    success: false,
                    errorMessage: error.errno == '-4051' ? 'Ordner kann nicht gelöscht werden, da er andere Ordner und/oder Dateien enthält.' : 'Unbekannter Fehler'
                });
                return;
            }

            res.json({success: true});
        });
    });

};