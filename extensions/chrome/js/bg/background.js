var connections = {};
var contentScriptPort;
var URL;



// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('incoming message ');
  console.log("message: " + request);
  try{
    if ( isURL( request ) ){ URL = request;}
  }catch (e){}
  //If the extension is asking for the URL
  if ( isRequestURL( request ) ){ sendResponse({farewell: URL});}
  else {
      // Messages from content scripts should have sender.tab set and redirect de id value to the extension
	  // Messages from devTools.js should be to attach or detach the document
		var tabIdPort = isContentScript( sender );
		var devToolPort = isDevTool( sender , request );

		var dest = tabIdPort || devToolPort ;
		dest.postMessage( request ); 
  }
  
  return true;
});

chrome.runtime.onConnect.addListener(function(port) {

  // Listen to messages sent from the DevTools page & Content Script
  port.onMessage.addListener(function(request) {
    
    //request.id == "content scriptt && request.name == "extension"
    //ToDo onDisconnect ()
    if ( request.id || request.name ){
      var connection = request.name ? request.tabId : contentScriptPort ;
      return connections[connection] = port ;
    }

  });

});

//UTIL
function isURL ( req ){
	return (typeof req != "object") && (req.indexOf ("http") > -1)
}

function isRequestURL ( req ){
	return req.greeting == "urlRequest";
}

function isContentScript ( sender ){
	return sender.tab && (sender.tab.id = 'currentWindow' ) ? connections[sender.tab.id] : false ;
} 

function isDevTool ( sender , req ){
	return (sender.url && (req == "attach" || req == "detach")) ? connections[contentScriptPort] : false ;
}