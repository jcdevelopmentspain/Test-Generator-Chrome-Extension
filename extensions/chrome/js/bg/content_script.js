
var body = document.getElementsByTagName("BODY")[0];
var URL = document.location.href;

//Binds sendChild function to click event.
function attach( parent ){
	$(parent).on('click', { value: parent },  sendChild);
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
	
	//e.cancelBubble = true;
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
function unbindClick ( parent ){
	$(parent).off('click',sendChild)
}


function sendURL(URL){
	chrome.runtime.sendMessage(URL);
}



//Checks every 500ms if Dev Tools is open for attach the events to the DOM.
var isAttached = false;
var checkDevTool = setInterval (function(){
		var threshold = 160;
		var heightThreshold = window.outerHeight - window.innerHeight > threshold;
		//The user has opened the devTools
		if (heightThreshold && !isAttached ){
			attach( body );
			sendURL(URL);
			isAttached = true;
			
		}else if ( !heightThreshold && isAttached) {
				//We have to remove attached events 
				unbindClick(body);
				isAttached = false;
			}
},500);

