define(function (require) {var registerSuite = require('intern!object');var assert = require('intern/chai!assert');registerSuite({name: 'index','greeting form': function () {return this
	.remote
.get(require.toUrl('https://es.linkedin.com/'))
.findById('login-email')
	.click()
		.end()
		.sleep(500)
.findById('login-email')
	.type('juancarlosdiezrodriguez@gmail.com')
		.end()
		.sleep(500)
.findById('login-password')
	.click()
		.end()
		.sleep(500)
.findById('login-password')
	.type('14041991')
		.end()
		.sleep(500)
.end()}});});