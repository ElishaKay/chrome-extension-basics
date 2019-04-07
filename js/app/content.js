let loopIndex = 0;

if(localStorage.getItem('loopIndex')){
	loopIndex = localStorage.getItem('loopIndex');
}

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
	console.log('loaded Amazon Search Page :)');
	let amazonData = document.querySelectorAll('.sg-col-inner');

	if(amazonData){
		console.log('amazonData: ', amazonData);
		sendToBackground('amazon-data', amazonData);
		nextPage();
	} else {
		console.log('no amazonData fetched. You probably got the captcha.')
	}
}

function nextPage(){
	loopIndex++;
	if(loopIndex==19){
		loopIndex = 0;
	}
	localStorage.setItem('loopIndex', loopIndex);
	window.location.href = `https://www.amazon.com/s?k=funny+gifts&page=${loopIndex}`;
}

function sendToBackground(dataSource, data){
	chrome.runtime.sendMessage({type: dataSource, data: data});
}

