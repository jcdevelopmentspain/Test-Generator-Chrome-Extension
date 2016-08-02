define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'buttonClick': function () {
      var actionId = "click";
      var elementId = "button0";
      var parameters = "";
      var buffer = [];
      switch(actionId) {

	    case "click":
	    	buffer.push(".findById('"+elementId+"').click().end()");
			buffer.push(".sleep(500)");
	    	break;

	   }

			
      assert.equal(buffer[0], ".findById('button0').click().end()");
    }
  });
});