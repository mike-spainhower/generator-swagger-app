'use strict';

var q = require('q'),
    _ = require('ls-lodash');

module.exports = function parametersPrompt(pathParams, thisArg) {
    return q.all(_.map(thisArg.spec.parameters, function(param) {
        var deferred = q.defer();

        thisArg.prompt([
            // give radio buttons for notFound, invalid, and forbidden
        ], function(answers) {
            // place answers in thisArg.spec.errorResponses
        });

        return deferred.promise;
    }));
}
