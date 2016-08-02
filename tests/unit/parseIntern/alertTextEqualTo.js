define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'alertTextEqualTo': function () {
      var actionId = "alertTextEqualTo";
      var elementId = "";
      var parameters = "alertText";
      var buffer = [];
      switch(actionId) {


	    case "alertTextEqualTo":
	    	buffer.push(".getAlertText().then(function(text){assert.strictEqual(text,'"+parameters+"')}).end()");
	    	break;
				    
	  }		   
			
      assert.equal(buffer[0], ".getAlertText().then(function(text){assert.strictEqual(text,'alertText')}).end()");
    }
  });
});