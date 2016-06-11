'use strict';
module.exports = cookieHeaderAuthentication;

function cookieHeaderAuthentication(neededHeader) {
  neededHeader = neededHeader || 'X-Api-Mocker-Valid-Value';

  return function cookieHeaderAuthentication(request, response, next) {

    var headers = request.headers;
    var headerKey;
    for (headerKey in headers) {

      if( headers.hasOwnProperty(headerKey) ) {
        if (headerKey.toLowerCase() === neededHeader.toLowerCase()) {
          var expectedValue = headers[headerKey];
          var name = headers[headerKey].split('=')[0];

          var actualValue = name + '=' + (request.cookies[name]||'');
          if (expectedValue !== actualValue) {
            var rsp = {
              description: 'Cookie value does not match Header: ' + neededHeader,
              expected: expectedValue,
              actual: actualValue
            };
            response.status(401).json(rsp);
          }
          next();
        }
      }
    }
    next();
  };
}
