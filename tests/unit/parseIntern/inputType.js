define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'inputType': function () {
      var actionId = "type";
      var elementId = "input0";
      var parameters = "test";
      var buffer = [];
      switch(actionId) {
      	
	    case "type":
	    	buffer.push(".findById('"+elementId+"').type('"+parameters+"').end()");
			buffer.push(".sleep(500)");
	    	break;

	   }

			
      assert.equal(buffer[0], ".findById('input0').type('test').end()");
    }
  });
});