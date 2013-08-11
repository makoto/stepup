//var debounced = _.debounce(swipePrint, 100, true);

function onGesture(gesture) {

	console.log(gesture);


	if(gesture.type == "swipe"){

		if(gesture.direction[0] > 0.5){

			console.log("RightSwipe");
		}
		else if(gesture.direction[0] < -0.5){

			console.log("LeftSwipe");
		}
		else if(gesture.direction[1] > 0.5){

			console.log("UpSwipe");
		}
		else if(gesture.direction[1] < -0.5){

			console.log("DownSwipe");
		}

		

		
	}
}
var db = _.debounce(onGesture, 100, true);


function swipe(obj) {
  if (obj.gestures.length > 0) {
    obj.gestures.forEach(db);
  }
}
console.log('Gestures!');

// listen to Leap Motion
Leap.loop( {enableGestures: true}, swipe);
 
 




function swipePrint (){

	console.log("hello");

}


/*var outputDiv = document.getElementById("output");
function output(json) {
  var div = document.createElement("div")
  div.innerHTML = JSON.stringify(json) + "<br/>";
  outputDiv.insertBefore(div, outputDiv.firstChild);
};*/