define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'isSelected': function () {
      var actionId = "isSelected";
      var elementId = "check";
      var parameters = "true";
      var buffer = [];
      switch(actionId) {
			
	    case "isSelected":
	    	buffer.push(".findById('"+elementId+"').isSelected().then(function(selected){assert.equal(selected , "+parameters+")}).end()");
	    	break;
	 
	   }

			
      assert.equal(buffer[0], ".findById('check').isSelected().then(function(selected){assert.equal(selected , true)}).end()");
    }
  });
});