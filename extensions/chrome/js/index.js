/*GLOBAL VARS

actionsCollection = copy of actionsJSON to print on the interface  
actionsJSON = array that parse the actionsJSON.json and is dynamically pushed with new actions ( id, element, parameters)
elementsCollection = elements that the user selects and are passed from the content script to the background which pass they to us


*/


var actionsCollection = [];
var elementsCollection = [];
var cssElementsMap = new Map();
var actionsJSON = null;


//COMUNICATION POSTMSG WITH BCKG.JS

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
	name: 'panel'
});

//Post info in the bckground.js to identify it
backgroundPageConnection.postMessage({
	name: 'extension',
	tabId: 'currentWindow'
	//chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function (msg) {

	//if msg is the url do nothing
	if (isNotUrl(msg)) {
		var clickedElements = find("clickedElements");
		//MSG is a css selector ?
		if (isObject(msg)) {
			var idCss = msg.className + "[" + msg.index + "]";
			//if msg hasn't yet been selected, include it into the data-model
			if (elementsCollection.indexOf(idCss) == -1) {
				elementsCollection.push(idCss);
				cssElementsMap.set(idCss, msg);
				try {
					clickedElements.insertAdjacentHTML('beforeend', '<option id="' + idCss + '">' + idCss + '</option>');
				} catch (e) { }
			}
			//If the element is already clicked, select it on the interface
			selectOption(clickedElements.children, idCss);
		} else {
			//MSG is an id
			//if msg hasn't yet been selected, include it into the data-model
			if (elementsCollection.indexOf(msg) == -1) {
				elementsCollection.push(msg);
				try {
					clickedElements.insertAdjacentHTML('beforeend', '<option id="' + msg + '">' + msg + '</option>');
				} catch (e) { }
			}
			//If the element is already clicked, select it on the interface
			selectOption(clickedElements.children, msg);
		}
	}

});

//END COMUNICATION POSTMSG WITH BCKG.JS

//Adding listeners and initializing

window.addEventListener("load", initialize);

function initialize() {
	AJAX_JSON_Req();
	loadStart();
}

function loadStart() {
	try {
		find("circleStart").addEventListener("click", load_StartTest);
		find("linkGenerar").disabled = true;
		find("linkAcciones").disabled = true;
	} catch (e) { }

}

function load_StartTest() {

	find("linkGenerar").addEventListener("click", load_viewExport);
	find("linkAcciones").addEventListener("click", load_viewInteraction);
	find("linkGenerar").disabled = false;
	find("linkAcciones").disabled = false;
	//Asking for the URL
	chrome.runtime.sendMessage({ greeting: "urlRequest" }, function (response) {
		var pageURL = response.farewell;
		var urlContainer = find("siteURL");
		urlContainer.insertAdjacentHTML('beforeend', '<a>' + pageURL + '</a>');
	});

	load_viewInteraction();
}

function load_viewExport() {

	find("codeContainer").disabled = true;
	/*find("framePrincipal").className = "";*/
	find("acciones").className = "upMenu";
	find("codigo").className = "upMenu";
	find("linkGenerar").className = " col-xs-12 menuLateral btn btn-default btn btn-primary";
	find("linkAcciones").className = " col-xs-12 menuLateral btn btn-default";


	initializeViewExport();
	printJSON();

}

function load_viewInteraction() {
	/*find("framePrincipal").className = "";*/
	find("acciones").className = "";
	find("codigo").className = "";
	find("circleStart").className = "hidden";
	find("codeContainer").className = "codeContainer form-control";
	find("linkAcciones").className = " col-xs-12 menuLateral btn btn-default btn btn-primary";
	find("linkGenerar").className = " col-xs-12 menuLateral btn btn-default";

	initializeViewInteraction();

}

function initializeViewExport() {

	find("buttonExport").addEventListener("click", checkFWork);

}

function initializeViewInteraction() {

	find("addToAction").addEventListener("click", addToAction);
	find("addButton").addEventListener("click", addToTest);
	find("deleteButton").addEventListener("click", deleteAction);
	find("deleteClickedElements").addEventListener("click", deleteElementClicked);


	var apiActions = find("apiActions");
	for (var i = apiActions.length - 1; i >= 0; i--) {
		var apiAction = apiActions[i];
		apiAction.addEventListener("dblclick", addToAction);
	};
}

//Functions
function addToTest() {
	//find("codeContainer").disabled = true;
	parseJSON();
	load_viewExport();


}
function parseJSON() {
	cleanActionsCollection(actionsCollection);

	for (var i = 0; i <= actionsCollection.length - 1; i++) {
		var currentAction = actionsCollection[i];
		id = cssElementsMap.get(currentAction.id)? buildCssRoute(cssElementsMap.get(currentAction.id)): currentAction.id ;
		actionName = actionsCollection[i].actionName;
		parameters = actionsCollection[i].parameters;
		actionsJSON['actionsJSON'].push({ "elementId": id, "actionId": actionName, "parameters": parameters });
	};

	cleanActionsChoosed();
}

function buildCssRoute (cssObject){
	return cssObject.className + "[" + cssObject.index +"]";
}

function selectIdFromContent(idElement) {

	var content = find("content");
	var frameContent = content.children[0];
	return frameContent.contentfind(idElement);
}


function createAction(elementId, actionId, params) {
	var action = {

		id: elementId,
		actionName: actionId,
		parameters: params
	};


	actionsCollection.push(action);

	return action;

}


function addToAction() {

	var elements = find("clickedElements");
	var elementSelected = elementsCollection[elements.selectedIndex];
	var params = find("params");
	var apiActions = find("apiActions");
	var actions = find("actionsChoosed");
	var selecteds = apiActions.selectedOptions;



	for (var i = 0; i <= selecteds.length - 1; i++) {
		var currentAction = createAction(elementSelected, selecteds[i].text, params.value);
		actions.insertAdjacentHTML('beforeend', '<option>' + currentAction.id + '.' + currentAction.actionName + '(' + currentAction.parameters + ')' + '</option>');
	};

	params.value = "";

}

function deleteAction() {

	var actions = find("actionsChoosed");

	for (var i = 0; i <= actions.length - 1; i++) {
		if (actions[i].selected) {
			delete actionsCollection[i];
		}
	};

	for (var i = actions.selectedOptions.length - 1; i >= 0; i--) {
		actions.removeChild(actions.selectedOptions[i]);

	};

	cleanActionsCollection();
}


function deleteFromForm(formId, collection) {

	var form = find(formId);

	for (var i = form.selectedOptions.length - 1; i >= 0; i--) {

		var index = form.selectedIndex;
		delete collection[form.selectedIndex];
		form.removeChild(form.selectedOptions[i]);

	};


}

function deleteElementClicked() {

	var elements = find("clickedElements");

	for (var i = elements.selectedOptions.length - 1; i >= 0; i--) {

		var index = elements.selectedIndex;
		delete elementsCollection[elements.selectedIndex];
		elements.removeChild(elements.selectedOptions[i]);
		cleanClickedElemens();
	};


}

function cleanClickedElemens() {

	var newArr = [];

	for (var index in elementsCollection) {

		if (elementsCollection[index]) {
			newArr.push(elementsCollection[index]);
		}

	}

	elementsCollection = newArr;
	return elementsCollection;



}

//We have to clean actionsCollection if we dont want to keep old added actions in the interaction vieww 
function cleanActionsCollection() {

	var newArr = [];

	for (var index in actionsCollection) {

		if (actionsCollection[index]) {
			newArr.push(actionsCollection[index]);
		}

	}

	actionsCollection = newArr;
	return actionsCollection;

}


function cleanActionsChoosed() {

	var actions = find("actionsChoosed");
	actionsCollection = [];

	for (var i = actions.length - 1; i >= 0; i--) {

		actions.removeChild(actions[i]);

	};


}

function AJAX_JSON_Req() {

	var xhr = new XMLHttpRequest();
	var doc;
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			actionsJSON = JSON.parse(xhr.responseText);
		}
	}; // Implemented elsewhere.
	xhr.open("GET", chrome.extension.getURL('js/actionsJSON.json'), true);
	xhr.send();

}


function printJSON() {
	find("codeContainer").value = "";

	for (var i = 0; i <= actionsJSON['actionsJSON'].length - 1; i++) {
		find("codeContainer").value += actionsJSON['actionsJSON'][i].elementId + '.' + actionsJSON['actionsJSON'][i].actionId + '(' + actionsJSON['actionsJSON'][i].parameters + ')' + '\n';

	};
};


function checkFWork() {

	var NightWatch = find("NightWatch");
	var Intern = find("Intern");
	var Jasmine = find("Jasmine");
	find("buttonExport").className += "btn btn-success ";
	find("textButtonExport").className += "glyphicon glyphicon-refresh glyphicon-refresh-animate";
	find("loader-wrapper").className += "loader-wrapper";
	find("loader").className += "loader";
	find("codeContainer").disabled = false;


	var delay = 2000;

	setTimeout(function () {
		find("buttonExport").className = "col-xs-6 btn btn-default";
		find("textButtonExport").className = "glyphicon glyphicon-floppy-saved";
		find("loader-wrapper").className = "";
		find("loader").className = "";

	}, delay);


	if (NightWatch.checked) {
		parseNightWatch();
	} else if (Jasmine.checked) {
		parseJasmine();
				} else {
		parseIntern();
	}

	//Load again the empty JSON to generate a new test
	AJAX_JSON_Req();

}



function parseIntern() {

	var buffer = [];

	for (var i = 0; i <= actionsJSON['actionsJSON'].length - 1; i++) {

		var actionId = actionsJSON['actionsJSON'][i].actionId;
		var elementId = actionsJSON['actionsJSON'][i].elementId;
		var parameters = actionsJSON['actionsJSON'][i].parameters;

		buffer = parseActionIntern(actionId, elementId, parameters, buffer);

	};

	buffer.push(".end()")
	createTestIntern(buffer);

}
function parseActionIntern(actionId, elementId, parameters, buffer) {
	
	switch (actionId) {

		case "acceptAlert":
			buffer.push(".acceptAlert().end()");
			break;

		case "equals":
			buffer.push(".findById('" + elementId + "').getVisibleText().equals('" + parameters + "').end()");
			break;

		case "type":
			buffer.push(".findById('" + elementId + "').type('" + parameters + "').end()");
			break;

		case "click":
			buffer.push(".findById('" + elementId + "').click().end()");
			break;

		case "alertTextEqualTo":
			buffer.push(".getAlertText().then(function(text){assert.strictEqual(text,'" + parameters + "')}).end()");
			break;

		case "isEnabled":
			buffer.push(".findById('" + elementId + "').isEnabled().then(function(enable){assert.equal(enable , " + parameters + ")}).end()");
			break;

		case "isSelected":
			buffer.push(".findById('" + elementId + "').isSelected().then(function(selected){assert.equal(selected , " + parameters + ")}).end()");
			break;

		case "clearValue":
			buffer.push(".findById('" + elementId + "').clearValue().end()");
			break;

		case "textEqualTo":
			buffer.push(".findById('" + elementId + "').getVisibleText().then(function(text){assert.strictEqual(text, '" + parameters + "')}).end()");
			break;

		case "valueEqualTo":
			buffer.push(".findById('" + elementId + "').getProperty('value').then(function(val){assert.equal(val, '" + parameters + "')}).end()");
			break;
	}

	return buffer;
}

function parseJasmine() {/*TODO*/ }
function parseNightWatch() {/*TODO*/ }

function createTestIntern(actions) {

	var theInternTemplate = {
		pageURL: find("siteURL").children[0].innerHTML,
		userActions: actions.join(""),
		theInternFooter: "}});});"
	};
	var internCode = Mustache.render(
		"define(function (require) {var registerSuite = require('intern!object');var assert = require('intern/chai!assert');registerSuite({name: 'index','greeting form': function () {return this.remote.get(require.toUrl('{{{pageURL}}}')){{{userActions}}}{{{theInternFooter}}}",
		theInternTemplate);

	find("codeContainer").value = "Your TEST is already DOWNLOADED !!";
	find("codeContainer").className += "codeContainer form-control testText";
	//The test is downloaded
	downloadTest(internCode);

}

function downloadTest(code) {
	var fileName = find("fileName").value;
	fileName = fileName == "" ? "test" : fileName;
	var beautyCode = js_beautify(code, { indent_size: 4 });
	var blob = new Blob([beautyCode], { type: "text/javascript" });
	saveAs(blob, fileName + ".js");
}

function selectOption(array, element) {
	for (var i = array.length - 1; i >= 0; i--) {
		var child = array[i];
		child.selected = child.id === element ? true : false;
	}
}
function find(id) {
	return document.getElementById(id);
}

function isNotUrl(msg) {
	//Check if msg is a cssMsgObject or if it's a normal id
	result = typeof msg == "object" ? true : msg.indexOf("/") == -1;
	return result;
}

function isObject(element) {
	return typeof element == "object";
}