define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'isEnabled': function () {
      var actionId = "isEnabled";
      var elementId = "check";
      var parameters = "true";
      var buffer = [];
      switch(actionId) {
		    
	    case "isEnabled":
	    	buffer.push(".findById('"+elementId+"').isEnabled().then(function(enable){assert.equal(enable , "+parameters+")}).end()");
	    	break;

	   }

			
      assert.equal(buffer[0], ".findById('check').isEnabled().then(function(enable){assert.equal(enable , true)}).end()");
    }
  }); 
});