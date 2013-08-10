$( document ).ready(function() {
    $.get("/data/segments.json").done(function(segments){
      var segment = segments.shift()

      $('#play').on("click", function(evt){
        pop = Popcorn("#video");
        pop.on("timeupdate", function(){
          $('#current-time').html(pop.currentTime())
        })
        pop.cue( segment.end_at, function() {
          this.currentTime( segment.start_at );
        });
        pop.currentTime( segment.start_at );
        pop.play();
      })

      $('#stop').on("click", function(evt){
        pop.pause()
      })

      $('#reset').on("click", function(evt){
        pop.currentTime(0)
        console.log(pop.currentTime)
      })

      $('#next').on("click", function(evt){
        segment = segments.shift()
        pop.cue( segment.end_at, function() {
          this.currentTime( segment.start_at );
        });
        pop.currentTime( segment.start_at );
        pop.play();
      })
    })
});