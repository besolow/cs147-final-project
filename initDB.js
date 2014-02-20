
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'jrnl';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var entries_json = require('./entries.json');
var users_json = require('./users.json');


// Step 2: Remove all existing documents
models.User
  .find()
  .remove()
  .exec(clearEntries); // callback to continue at

function clearEntries(err){
  if(err) console.log(err);
  models.Entry
    .find()
    .remove()
    .exec(addEntries); // callback to continue at
}

// Step 3: load the data from the JSON file
function addEntries(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = entries_json.length;
  for(var i=0; i<entries_json.length; i++) {
    var json = entries_json[i];
    var entry = new models.Entry(json);

    entry.save(function(err, entry) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE adding entries');
        // The script won't terminate until the 
        // connection to the database is closed
        addUsers();
      }
    });
  }
}

function addUsers() {
  var to_save_count = users_json.length;
  for(var i=0; i<users_json.length; i++) {
    var json = users_json[i];
    var user = new models.User(json);

    user.save(function(err, user) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE adding Users');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
}
