$( document ).ready(function() {
  console.log( "ready!" );
  $.get("/data/segments.json").done(function(d){console.log(d)})
});