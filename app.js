
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

moment = require('./public/js/moment.min.js');

var login = require('./routes/login')
var project = require('./routes/project');
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

// Example route
// var user = require('./routes/user');

var app = express();

hbs = handlebars.create({
    helpers: {
        //usage: {{dateFormat 1392115303100 format="MM/DD/YYYY"}}
        dateFormat: function(context, block) {
                var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
                return moment(context).format(f); //had to remove Date(context)
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/login', login.view);
app.get('/home', home.view);
app.get('/time', time.view);
app.get('/tags', tags.view);
app.get('/emotion', emotion.view);
app.get('/entry/:datetime', entry.view);
app.get('/create_new', create_new.view);
app.get('/edit/:datetime', edit.view);
app.get('/settings', settings.view);
app.get('/search', search.view);
app.get('/tag_sort/:sortBy', tag_sort.sortTag);
app.post('/delete_entry', delete_entry.deleteEntry);
app.post('/save', save.save);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
