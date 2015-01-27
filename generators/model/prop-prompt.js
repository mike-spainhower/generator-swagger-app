'use strict';

var _ = require('ls-lodash'),
    typeToFormatMap = {
        integer: [ 'int32', 'int64' ],
        number: [ 'float', 'double'],
        string: [ '', 'byte', 'date', 'date-time']
    };

module.exports = function propPrompt(done) {
    var doneFn = done || this.async();

    this.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Property name?',
            'default': 'id',
            filter: this._.camelize.bind(this)
        },
        {
            type: 'input',
            name: 'type',
            message: 'Type? (integer | number | string | boolean | <model_name>)',
            'default': 'string'
        },
        {
            type: 'list',
            name: 'format',
            message: 'Format?',
            choices: function(answersSoFar) {
                return typeToFormatMap[answersSoFar.type];
            },
            when: function(answersSoFar) {
                return _.includes(_.keys(typeToFormatMap), answersSoFar.type);
            }
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Description?'
        },
        {
            type: 'confirm',
            name: 'required',
            message: 'Required?',
            'default': false
        },
        {
            type: 'confirm',
            name: 'moreProps',
            message: 'Add more properties?',
            'default': false
        }
    ], function(answers) {
        answers.required ? this.jsonBlob.required.push(answers.name) : void 0;

        this.jsonBlob.properties[answers.name] = {
            type: answers.type,
            description: answers.desc
        };

        answers.format ? this.jsonBlob.properties[answers.name]['format'] = answers.format : void 0;

        answers.moreProps ? propPrompt.bind(this)() : doneFn();
    }.bind(this));
}
