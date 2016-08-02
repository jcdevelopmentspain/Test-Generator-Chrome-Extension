define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'clearValue': function () {
      var actionId = "clearValue";
      var elementId = "input0";
      var parameters = "";
      var buffer = [];
      switch(actionId) {

	    case "clearValue":
	    	buffer.push(".findById('"+elementId+"').clearValue().end()");
	    	break;

	  
	   }

			
      assert.equal(buffer[0], ".findById('input0').clearValue().end()");
    }
  });
});