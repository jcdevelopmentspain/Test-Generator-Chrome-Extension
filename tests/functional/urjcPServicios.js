define(function (require) {
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	registerSuite({
		name: 'index',
		'greeting form': function () {
			return this.remote.get(require.toUrl('http://miportal.urjc.es'))
			.findById('c')
				.type('jc.diez')
				.end()
				.sleep(500)
			.findById('c3')
				.type('14041991')
				.end()
				.sleep(500)
			.findById('c2')
				.click()
				.end()
				.sleep(5000)
			.end()}});});