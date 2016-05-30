var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models  = require('./models');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./routes/images')(app);
require('./routes/places')(app);
require('./routes/persons')(app);
require('./routes/links')(app);
require('./routes/tags')(app);
require('./routes/fileSystem')(app);
require('./routes/search')(app);

app.get('*', function (req, res) {
    res.sendfile('./public/views/index.html');
});

// start the app ==================================================
models.sequelize.sync().then(function() {
    var server = app.listen(port, function() {
        console.log('Server listening on port ' + server.address().port);
    });
});

exports = module.exports = app;