
var body = document.getElementsByTagName("BODY")[0];
var URL = document.location.href;

//Binds sendID function to click event.
function attach( parent ){
	for( var i=0; i < parent.children.length ; i++ ){
		var child = parent.children[i];
		if( child.id ){	
			$(child).bind('click',{ value: child.id },sendID);
		} 		
		attach( child );
	}
} 

//Sends the id when the user selects an element and avoids navigation.
var sendID = function( e ){
	chrome.runtime.sendMessage(e.data.value);
	//e.cancelBubble = true;
	e.stopPropagation();
	e.preventDefault();
}

//When user closes the extension, click events works as always.
function unbindClick ( parent ){

	for (var i=0; i < parent.children.length; i++) {
		var child = parent.children[i];
		$(child).unbind('click',sendID);
		unbindClick(child);
	}
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

