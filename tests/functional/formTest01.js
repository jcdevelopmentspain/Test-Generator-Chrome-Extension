define(function (require) {var registerSuite = require('intern!object');var assert = require('intern/chai!assert');registerSuite({name: 'index','greeting form': function () {return this.remote.get(require.toUrl('http://form.jotformpro.com/form/42683761560964')).findById('input_1').getVisibleText().then(function(text){assert.strictEqual(text, '')}).end().findById('input_1').type('JC').end().sleep(500).findById('input_3').type('jc@email.com').end().sleep(500).findById('input_4').type('600').end().sleep(500).findById('input_1').getProperty('value').then(function(val){assert.equal(val, 'JC')}).end().findById('input_3').getProperty('value').then(function(val){assert.equal(val, 'jc@email.com')}).end().findById('input_4').getProperty('value').then(function(val){assert.equal(val, '600')}).end().findById('input_8').click().end().sleep(500).end()}});});