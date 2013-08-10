var express = require('express'),
    App = express(),
    server = require('http').createServer(App);

// Connect configuration
App.configure(function() {
    App.use('./static', express.static(__dirname + './static'));
    App.use(express.static(__dirname));
});


// Start server
if (!module.parent) {
    server.listen(process.env.VCAP_APP_PORT || 3000);
    console.log("Listening on port %d", server.address().port);
}


