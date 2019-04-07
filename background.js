let server_url='http://localhost:5000';

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "init":
                console.log('init case called');
                break;
            case "amazon-data":
                console.log('amazon-data:', message);
                $.ajax({
                    url: server_url + "/add-amazon-DOM-data",
                    data: message,
                    type: "POST",
                    success: function(a) {
                      console.log(a);
                    },
                    error: function(a) {
                      console.log("Error");
                      console.log(a);
                    }
                });
                break;
            
            case "case2":
              
            break;
        }
    }
);

//Fetch Amazon Network Data
chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: ["<all_urls>" ] }, ["blocking"]);
let isDebuggerAttached=false;

 function attachDebugger(details){
 		if(!isDebuggerAttached){
        tabId = details.tabId;
        isDebuggerAttached = true;
        
        chrome.debugger.attach({tabId:tabId}, "1.2");
        chrome.debugger.sendCommand({ tabId:tabId }, "Network.enable");
        chrome.debugger.onEvent.addListener(onEvent);
      }
    }

function onEvent(debuggeeId, message, params) {
  if (message == "Network.responseReceived" && params.response.url.includes('graph')){
  	console.log('message, params: ',message, params);
	  chrome.debugger.sendCommand({
	                  tabId: tabId
	              }, "Network.getResponseBody", {
	                  "requestId": params.requestId
	              }, function(response) {
                        if(response){
                            let responseObj = JSON.parse(response.body);
                            responseObj = responseObj[0].data.project;
          	              	console.log('responseObj in background.js: ',responseObj);
          	                      // you get the response body here and send to DB Server!
                            $.ajax({
                                url: server_url + "/add-amazon-network-data",
                                data: responseObj,
                                type: "POST",
                                success: function(a) {
                                  console.log(a);
                                },
                                error: function(a) {
                                  console.log("Error");
                                  console.log(a);
                                }
                            });
                        }
	  });
  } 
  //If theres something else you want from the network tab
  else if (message == "Network.responseReceived" && params.response.url.includes('some-other-api-url-substring')){
      // console.log('debuggeeId: ',debuggeeId)
      // console.log('message: ',message)
      // console.log('params: ',params);
       chrome.debugger.sendCommand({
                      tabId: tabId
                  }, "Network.getResponseBody", {
                      "requestId": params.requestId
                  }, function(response) {
                    if(response){
                    // console.log('response.body: ',response.body);
                    let responseObj = JSON.parse(response.body);
                      $.ajax({
                        url: server_url + "/add-alibaba-data/",
                        data: responseObj,
                        type: "POST",
                        success: function(a) {
                            console.log('success of alibaba api: ',a);
                        }
                      })
                  }
      });
  }
}


// Less Relevant Feature- add listener for when Extension icon is clicked
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});

