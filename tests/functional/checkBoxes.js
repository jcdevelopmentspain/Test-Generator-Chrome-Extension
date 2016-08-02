define(function (require)
 {var registerSuite = require('intern!object');

 var assert = require('intern/chai!assert');
 registerSuite({name: 'index','greeting form': function () {
 	return this.remote.get(require.toUrl('http://www.jotformpro.com/form/42678627144967'))

 	.findById('input_8_0')
 	.click()
 	.end()
 	.sleep(500)
 	.findById('input_8_2')
 	.isSelected()
 	.then(function(enable)
 		{assert
 		.equal(enable , false)})
 	.end()
 	.findById('input_8_6')
 	.isSelected()
 	.then(function(enable){
 		assert.equal(enable , false)}).end()
 	.findById('input_8_0')
 	.isSelected().then(function(enable){
 		assert.equal(enable , true)}).end()
 	.findById('input_8_0')
 	.isSelected().then(function(selected){
 		assert.equal(selected , true)}).end()
 	.findById('input_8_1')
 	.isSelected().then(function(selected){
 		assert.equal(selected , false)}).end()
 	.findById('input_8_2')
 	.isSelected().then(function(selected){
 		assert.equal(selected , false)}).end()
 	.findById('input_8_6').isSelected().then(function(selected)
 		{assert.equal(selected , false)}).end()
 	.findById('input_8_6').click().end().sleep(500)
 		.findById('input_8_0').isSelected().then(function(selected)
 	{assert.equal(selected , false)}).end()
 		.findById('input_8_6').isSelected().then(function(selected)
 	{assert.equal(selected , true)}).end()
 	.findById('input_9_1').click().end().sleep(500)
 	.findById('input_9_0').click().end().sleep(500)
 	.findById('input_9_1').isSelected().then(function(selected)
 	{assert.equal(selected , false)}).end()
 	.findById('input_9_0').isSelected().then(function(selected)
 	{assert.equal(selected , true)}).end().end()}});
});
