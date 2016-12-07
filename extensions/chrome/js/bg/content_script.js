//const
var BODY = document.getElementsByTagName("BODY")[0];
var URL = document.location.href;

//Binds sendChild function to click event.
function attach( parent ){
	$(parent).on('click', { value: parent },  sendChild);
	sendURL();
}

//Sends the id when the user selects an element and avoids navigation.
var sendChild = function( e ){

	if (e.target.id){
		chrome.runtime.sendMessage(e.target.id);
	} else if (e.target.className){
		var index = selectCssElement ( e.target , e.target.className );
		var elementProperties = {
			"index" : index,
			"className": e.target.className
		}
		chrome.runtime.sendMessage(elementProperties);

	}

	e.stopPropagation();
	e.preventDefault();
}
//Select the proper html-element if there is more than one with the same class name
function selectCssElement ( element, className ){
	var siblings = document.getElementsByClassName(className);
	if (typeof siblings == "object"){
		var match = false;
		var i = 0;
		while( match == false ){
			element === siblings[i] ? match = true : i++ ;
		}
		return i;
	}
}


//When user closes the extension, click events works as always.
function detach ( parent ){
	$(parent).off('click',sendChild)
}


function sendURL(URL){
	chrome.runtime.sendMessage(URL);
}


var port = chrome.runtime.connect({name: "Background connection"});
port.postMessage({id: "Content Script connection attemp"});
port.onMessage.addListener(function(msg) {
	if(msg.question == "attach" || msg.question == "detach"){
		if(msg.question == "attach"){
			attach(BODY);
		}else{
			detach(BODY);
		}
	}
});