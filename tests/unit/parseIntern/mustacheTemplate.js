define([
  'intern!object',
  'intern/chai!assert',
  'intern/dojo/node!mustache'
 
], function (registerSuite, assert,mustache) {
  registerSuite({
    name: 'mustacheRender',

    'mustacheInternTemplate': function () {
      var actions = [".acceptAlert().end()",".findById('button0').click().end()",".findById('text0').getVisibleText().then(function(text){assert.strictEqual(text, 'myText')}).end()",".findById('label').getProperty('value').then(function(val){assert.equal(val, 'textLabel')}).end()"]
     	var theInternTemplate = {
				pageURL: "www.test.com",
				userActions: actions.join(""),
				theInternFooter: "}});});"
			};
			var internCode = mustache.render(
				"define(function (require) {var registerSuite = require('intern!object');var assert = require('intern/chai!assert');registerSuite({name: 'index','greeting form': function () {return this.remote.get(require.toUrl('{{{pageURL}}}')){{{userActions}}}{{{theInternFooter}}}",
				theInternTemplate);
			
      	assert.equal(internCode,"define(function (require) {var registerSuite = require('intern!object');var assert = require('intern/chai!assert');registerSuite({name: 'index','greeting form': function () {return this.remote.get(require.toUrl('www.test.com')).acceptAlert().end().findById('button0').click().end().findById('text0').getVisibleText().then(function(text){assert.strictEqual(text, 'myText')}).end().findById('label').getProperty('value').then(function(val){assert.equal(val, 'textLabel')}).end()}});});");
    }
  });
});