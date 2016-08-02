define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'equals': function () {
      var actionId = "equals";
      var elementId = "text0";
      var parameters = "myText";
      var buffer = [];
      switch(actionId) {
	   
	    case "equals":
	        buffer.push(".findById('"+elementId+"').getVisibleText().equals('"+parameters+"').end()");
	        break;  
	   }

			
      assert.equal(buffer[0], ".findById('text0').getVisibleText().equals('myText').end()");
    }
  });
});