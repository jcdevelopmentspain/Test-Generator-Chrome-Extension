//const
var BODY = document.getElementsByTagName("BODY")[0];
var URL = document.location.href;

//Connection with Content Script for  attach / detach the document
var port = chrome.runtime.connect({name: "Background connection"});
port.postMessage({id: "content script"});
port.onMessage.addListener(function(msg) {
	if(msg == "attach" || msg == "detach"){
		if(msg == "attach"){
			attach(BODY);
		}else{
			detach(BODY);
		}
	}
});

//Binds sendChild function to click event.
function attach ( parent ){
	$(parent).on('click', { value: parent },  sendChild);
	sendURL( URL );
}

//Sends the id when the user selects an element and avoids navigation.
function sendChild ( e ){
	
	var child = e.target.id || e.target.className;
	if ( child ){
		child = e.target.id ? child : child = {
												"index" : selectCssElement ( e.target , e.target.className ),
												"className": e.target.className
											};
		sendChromeMessage(child);		
	}
	e.stopPropagation();
	e.preventDefault();
}


//Select the proper html-element if there is more than one with the same class name
function selectCssElement ( element, className ){
	var siblings = document.getElementsByClassName(className);
	if (typeof siblings == "object"){

		for ( var i in siblings ){
			if(element === siblings[i]){ break; }
		}

		return i;
	}
}


//When user closes the extension, click events works as always.
function detach ( parent ){
	$(parent).off('click',sendChild);
}


function sendURL( URL ){
	sendChromeMessage(URL);
}

function sendChromeMessage( msg ){
	chrome.runtime.sendMessage(msg);
}