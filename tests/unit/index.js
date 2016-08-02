define([
  'intern!object',
  'intern/chai!assert',
  'intern/order!../../extensions/chrome/js/index.js'
], function (registerSuite, assert) {
  registerSuite({
    name: 'plugin.jquery.js',

    'basic tests': function () {
    	alert("hola");
    	assert.isOk( actionsCollection );
    }
  });
});