// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var Parse = require('parse/node');
var bodyParser = require('body-parser');
var configEnv = require('./config/enviro.js');


var databaseUri = configEnv.DATABASE_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri,
  cloud: __dirname + '/cloud/main.js',
  appId: configEnv.PARSE_APP_ID,
  masterKey: configEnv.PARSE_MASTER_KEY,
  serverURL: configEnv.PARSE_SERVER_URL,
});


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = configEnv.PARSE_MOUNT || '/parse';
app.use(mountPath, api);


var port = configEnv.PORT || 1339;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('turnos running on port ' + port + '.');
});

//Parse initialize
Parse.initialize(configEnv.PARSE_APP_ID);
Parse.serverURL =configEnv.PARSE_SERVER_URL;
 
require('./api/router/router.js')(app);
