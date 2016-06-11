var jsonServer = require('json-server')
var cookieParser = require('cookie-parser');
var cookieManager = require('./header-cookies-manager');
var cookieAuth = require('./header-cookies-auth');

var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

server.set('port', (process.env.PORT || 5000));


// Add custom cookie middlewares
server.use(cookieParser());  // needed in cookieParser
server.use(cookieManager());
server.use(cookieAuth());

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// Use default router
server.use(router)

server.listen(server.get('port'), function() {
  console.log('Try http://localhost:'+server.get('port')+'/');
});
