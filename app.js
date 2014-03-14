
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
moment = require('./public/js/moment.min.js');

var login = require('./routes/login');
var user = require('./routes/user');
var home = require('./routes/home');
var tags = require('./routes/tags');
var time = require('./routes/time');
var emotion = require('./routes/emotion');
var entry = require('./routes/entry');
var create_new = require('./routes/create_new');
var delete_entry = require('./routes/delete_entry');
var edit = require('./routes/edit');
var settings = require('./routes/settings');
var search = require('./routes/search');
var save = require('./routes/save');
var tag_sort = require('./routes/tag_sort');
var new_account = require('./routes/new_account');

// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'jrnl';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

hbs = handlebars.create({
    helpers: {
        //usage: {{dateFormat 1392115303100 format="MM/DD/YYYY"}}
        dateFormat: function(context, block) {
            var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
            return moment(context).format(f); //had to remove Date(context)
        },

        breakLines: function(text) {
            return text.replace(/(\r\n|\n|\r)/gm, '<br>');
        }
    }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var session = req.session;
    var messages = session.messages || (session.messages = []);

    next()
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/login', login.view);
app.get('/home', home.view);
app.get('/time', time.view);
app.get('/tags/:sortBy', tags.sortTag);
app.get('/tag_suggest.json', tags.tagSuggestions);
app.get('/emotion', emotion.view);
app.get('/entry/:_id', entry.view);
app.get('/create_new', create_new.view);
app.get('/edit/:_id', edit.view);
app.get('/settings', settings.view);
app.get('/search', search.view);
app.post('/login_action', user.login);
app.get('/logout', user.logout);
app.post('/changePass', user.changePass);
//app.get('/tag_sort/:sortBy', tag_sort.sortTag);
app.post('/delete_entry', delete_entry.deleteEntry);
app.post('/save/:oldNew', save.save);
app.get('/new_account', new_account.view);
app.get('/support', settings.support);
app.post('/createAccount', new_account.createAccount);

app.get('/create_new_B', create_new.emoticonView);
app.get('/create_new_C', create_new.emoticonSideView);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
