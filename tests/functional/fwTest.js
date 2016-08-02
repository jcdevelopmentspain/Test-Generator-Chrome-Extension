define(function (require) {
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	registerSuite({
		name: 'fwTest',
		'greeting form': function () {
			return this.remote.get(require.toUrl('fwTest.html'))
			.findById('button1')
				.isEnabled()
				.then(function(enable){
					assert.equal(enable , true )})
					.end()
			.findById('checkBox')
				.isSelected()
				.then(function(selected){
					assert.equal(selected , false)})
					.end()
			.findById('content')
				.getVisibleText()
				.then(function(text){
					assert.strictEqual(text, '')})
					.end()
			.findById('checkBox')
				.click()
				.end()
				.sleep(500)
			.findById('checkBox')
				.isSelected()
				.then(function(selected){
					assert.equal(selected , true)})
					.end()
			.findById('content')
				.type('Hello!')
				.end()
				.sleep(500)
			.findById('button1')
				.click()
				.end()
				.sleep(500)
			.getAlertText()
				.then(function(text){
					assert.strictEqual(text,'Hello!')})
					.end()
			.acceptAlert()
				.end()
			.findById('content')
				.clearValue()
				.end()
			.end()}});});