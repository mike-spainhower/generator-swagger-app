'use strict';

var q = require('q'),
    _ = require('ls-lodash');

module.exports = function propPrompt(pathParams, thisArg) {
    var deferred = q.defer();

    // prompt for description of path params
    // prompt for body param
    // prompt for qs params

    thisArg.prompt([

    ], function(answers) {

    });

    return deferred.promise;
}
