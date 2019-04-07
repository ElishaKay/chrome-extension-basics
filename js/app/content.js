
console.log("Content js script loaded.");

document.onerror = function(event) { 
	console.log('event: ',event);
}

function wait(ms){
	  var start = new Date().getTime();
	  var end = start;
	  while(end < start + ms) {
	  end = new Date().getTime();
	  }
}

if(window.location.href.includes('https://www.amazon.com/s?k=funny+gifts')){
	let dataSource = 
	console.log('loaded Amazon Search Page :)');

	let amazonData = document.querySelectorAll('.sg-col-inner');
	console.log('amazonData: ', amazonData);
	sendToBackground('amazon-data', amazonData);
}


function nextPage(){
	loopIndex++;
	localStorage.setItem('loopIndex', loopIndex);
	window.location.href = `${campaign_list[campaign_link_number]}/comments`;
}

function sendToBackground(dataSource, data){
	chrome.runtime.sendMessage({type: dataSource, data: data});
}

