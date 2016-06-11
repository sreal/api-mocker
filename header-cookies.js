'use strict';
var cookie = require('cookie');
var signature = require('cookie-signature');

module.exports = headerCookieManager;

function headerCookieManager(cookiePrefix) {
  cookiePrefix = cookiePrefix || 'X-Api-Mocker';
  var SET_HEADER = cookiePrefix + '-set-cookie';
  var CLEAR_HEADER = cookiePrefix + '-clear-cookie';

  return function headerCookieManager(request, response, next) {

    var headers = request.headers;
    var headerKey;
    for (headerKey in headers) {
      if( headers.hasOwnProperty( headerKey ) ) {

        if (headerKey.toLowerCase() === SET_HEADER.toLowerCase()) {
          splitCookie = headers[headerKey].split('=');
          var key = splitCookie[0];
          var val = splitCookie[1] || '';
          response.setCookieString(key, val);
          next();
        }

        if (headerKey.toLowerCase() === CLEAR_HEADER.toLowerCase()) {
          response.clearCookie(headers[headerKey]);
          next();
        }
      }
    }

    next();
  };
}
