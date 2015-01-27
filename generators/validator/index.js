'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('name', {
            desc: 'Validator Name',
            required: true,
            type: 'String'
        });

        this.name = this._.dasherize(this.name);
    },
    writing: function() {
        this.fs.copyTpl(
            this.templatePath('validator.js'),
            this.destinationPath('validators/' + this.name + '.js'),
            { name: this._.camelize(this.name) }
        );
    }
});
