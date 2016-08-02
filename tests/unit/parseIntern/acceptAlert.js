define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    'acceptAlert': function () {
      var actionId = "acceptAlert";
      var elementId = "";
      var parameters = "";
      var buffer = [];
      switch(actionId) {

				    case "acceptAlert":
						buffer.push(".acceptAlert().end()");
				        break;

				}

			
      assert.equal(buffer[0], ".acceptAlert().end()");
    }
  });
});