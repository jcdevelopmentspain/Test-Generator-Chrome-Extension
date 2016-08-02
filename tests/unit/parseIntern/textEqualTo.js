define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'textEqualTo': function () {
      var actionId = "textEqualTo";
      var elementId = "text0";
      var parameters = "myText";
      var buffer = [];
      switch(actionId) {
			   
	    case "textEqualTo":
	    	buffer.push(".findById('"+elementId+"').getVisibleText().then(function(text){assert.strictEqual(text, '"+parameters+"')}).end()");
	    	break;

	   
	  }

			
      assert.equal(buffer[0], ".findById('text0').getVisibleText().then(function(text){assert.strictEqual(text, 'myText')}).end()");
    }
  });
});