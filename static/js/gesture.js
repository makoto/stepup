// listen to Leap Motion
Leap.loop({enableGestures: true}, function(obj) {
  if (obj.gestures.length > 0) {
    obj.gestures.forEach(function(gesture) {
      console.log(gesture);
    });
  }
});

var outputDiv = document.getElementById("output");
function output(json) {
  var div = document.createElement("div")
  div.innerHTML = JSON.stringify(json) + "<br/>";
  outputDiv.insertBefore(div, outputDiv.firstChild);
};