var _ = require('lodash');

module.exports = headerCookiesManager;

function headerCookiesManager(cookiePrefix) {
  cookiePrefix = cookiePrefix || 'X-Api-Mocker';
  var SET_HEADER = cookiePrefix + '-set-cookie';
  var CLEAR_HEADER = cookiePrefix + '-clear-cookie';

  return function headerCookiesManager(request, response, next) {

    var headers = request.headers;

    var isEqTo = function(base) {
      return function(compare) {
        return base.toLowerCase() === compare.toLowerCase();
      };
    };
    var isSetHeader = isEqTo(SET_HEADER);
    var isClearHeader = isEqTo(CLEAR_HEADER);

    _.forEach(_.toPairs(headers), function(header) {

      var key = _.first(header);
      var tail = _.join(_.flatten(_.tail(header)), ',').split(',');

      if (isSetHeader(key)) {
        _.each(tail, function(cookieVal) {
          var splitCookie = cookieVal.split('=');
          response.cookie(_.first(splitCookie),
                          _.join(_.tail(splitCookie), '='));
        });
      }
      if (isClearHeader(key)) {
        _.each(tail, function(name) {
          response.clearCookie(name); });
      }

    });

    next();
  };
}
