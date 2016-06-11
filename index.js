var express = require('express');
var headerCookies = require('./header-cookies');

var app = express( );

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/static'));
app.use(headerCookies());

app.set('json', __dirname + '/json');

app.get('/cookie/create/:name/:value', function(request, response) {
  response.cookie(request.params.name, request.params.value);
  response.redirect('/');
});
app.get('/cookie/create/:name', function(request, response) {
  response.cookie(request.params.name, 'default-value');
  response.redirect('/');
});
app.get('/cookie/delete/:name', function(request, response) {
  response.clearCookie(request.params.name);
  response.redirect('/');
});
app.get('/*', function(request, response) {
  response.send(request.headers);
});



app.listen(app.get('port'), function() {
  console.log('Try http://localhost:'+app.get('port')+'/');
});
