$( document ).ready(function() {
    video = new App.Video()
    var stepsView = new App.StepsView({
        el: '#score',
        model: video
    });
    App.stepsView = stepsView
    controlsView = new App.ControlsView({model:video})
    steps = new App.Steps({video: video})

    steps.on("sync", function(eventName) {
      var step = steps.current()
      pop = Popcorn("#video");

      video.on("change:speed", function(){
        pop.playbackRate(this.get("speed"))
      })

      $('#play').on("click", function(evt){
        video.set({"step":1, "level":1})
        pop.on("timeupdate", function(){
          $('#current-time').html(App.ViewHelper.formatTime(pop.currentTime()))
        })
        pop.cue( step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        pop.currentTime( step.get("start_at") );
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
        step = steps.next()
        pop.cue( step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        pop.currentTime( step.get("start_at") );
        pop.play();
      })

    });
    steps.fetch()


});