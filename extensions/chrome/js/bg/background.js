var connections = {};
var URL;
var contentScriptPort;

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('incoming message from injected script');
  console.log("mensaje: " + request);
  
  try{
    if ( typeof request != "object" ){  
      if (request.indexOf ("http") > -1){
      URL = request;
      }
    }
  }catch (e){}
  //If the extension is asking for the URL
  if (request.greeting == "urlRequest"){
    sendResponse({farewell: URL});
  } else {
      // Messages from content scripts should have sender.tab set

      if (sender.tab) {
        var tabId = sender.tab.id;
        if (tabId = 'currentWindow' /*in connections*/) {
          connections[tabId].postMessage(request);
        } else {
          console.log("Tab not found in connection list.");
        }
      } else if(sender.url){
        //Report to the content script that it should attach the HTML document events
        if (request == "attachBody"){
          connections[contentScriptPort].postMessage({question: "attach"});
        }else{
          connections[contentScriptPort].postMessage({question: "detach"});          
        }
      }else{
        console.log("sender.tab not defined.");
      }
  }
  
  return true;
});

chrome.runtime.onConnect.addListener(function(port) {

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(function(request) {
    if (request.id == "Content Script connection attemp"){
      connections[contentScriptPort] = port;
    }
    // Register initial connection
    if (request.name == 'extension') {
      console.log('Incoming message from dev tools page');    
      connections[request.tabId] = port;

      port.onDisconnect.addListener(function() {
        delete connections[request.tabId];
      });

      return;
    }
  });

});
