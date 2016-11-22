var connections = {};
var URL;

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
      } else {
        console.log("sender.tab not defined.");
      }
  }
  
  return true;
});

chrome.runtime.onConnect.addListener(function(port) {

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(function(request) {
    console.log('Incoming message from dev tools page');

    // Register initial connection
    if (request.name == 'init') {
      connections[request.tabId] = port;

      port.onDisconnect.addListener(function() {
        delete connections[request.tabId];
      });

      return;
    }
  });

});
