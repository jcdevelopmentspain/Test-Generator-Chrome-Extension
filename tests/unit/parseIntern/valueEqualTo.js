define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'valueEqualTo': function () {
      var actionId = "valueEqualTo";
      var elementId = "label";
      var parameters = "textLabel";
      var buffer = [];
      switch(actionId) {

	    case "valueEqualTo":
			buffer.push(".findById('"+elementId+"').getProperty('value').then(function(val){assert.equal(val, '"+parameters+"')}).end()");
			break;
	  }

			
      assert.equal(buffer[0], ".findById('label').getProperty('value').then(function(val){assert.equal(val, 'textLabel')}).end()");
    }
  });
});