'use strict';

var _ = require('ls-lodash'),
    generators = require('yeoman-generator'),
    propPrompt = require('./prop-prompt');


module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('name', {
            desc: 'Name of model',
            required: true,
            type: 'String'
        });

        this.name = this._.dasherize(this.name);

        this.jsonBlob = {
            id: this._.classify(this.name),
            required: [],
            properties: {}
        };
    },

    prompting: _.ary(propPrompt, 0),
    
    writing: function() {
        this.fs.writeJSON('models/' + this.name + '.json', this.jsonBlob);
    }
});
