'use strict';

var _ = require('ls-lodash'),
    parametersPrompt = require('./parameters-prompt'),
    errorsPrompt = require('./errors-prompt'),
    avilableHttpMethods = [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ];

module.exports = function propPrompt(done) {
    var doneFn = done || this.async();

    this.prompt([
        {
            type: 'list',
            name: 'method',
            message: 'HTTP Method:',
            choices: availableHttpMethods
        },
        {
            type: 'input',
            name: 'path',
            message: 'Path of API endpoint. (params in {}):'
        },
        {
            type: 'input',
            name: 'type',
            message: 'Return type:'
        },
        {
            type: 'input',
            name: 'nickname',
            message: 'Nickname of API endpoint:'
        },
        {
            type: 'input',
            name: 'summary',
            message: 'Summary of endpoint operation:'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description of API endpoint:'
        },
        {
            type: 'input',
            name: 'notes',
            message: 'Notes:'
        }
    ], function(answers) {
        var pathParamsMatchList = answers.path.match(/{([a-zA-Z0-9]+)}/g),
            pathParams = _.map(pathParamsMatchList, function(pathParamRaw) {
                return pathParamRaw.replace(/{|}/g, '');
            });

        this.spec = _.clone(answers);

        parametersPrompt(pathParams, this)
            .then(_.seal(errorsPrompt, [pathParams, this], 1))
            .then(doneFn);
    }.bind(this));
}
