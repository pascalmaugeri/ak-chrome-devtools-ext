// background.js

var openCount = 0;

chrome.runtime.onConnect.addListener(function (port) {

    if (port.name == "devtools-page") {
      if (openCount == 0) {
        alert("DevTools window opening.");
        console.log("DevTools window opening.");
      }
      openCount++;

      port.onDisconnect.addListener(function(port) {
          openCount--;
          if (openCount == 0) {
            alert("Last DevTools window closing.");
          }
      });

    }

});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    alert("Incoming message");
    return true;
});
