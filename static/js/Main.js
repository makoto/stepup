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

      $('#next').on("click", function(evt){
        step = steps.next()
        pop.cue( step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        pop.currentTime( step.get("start_at") );
        pop.play();
      })

      $('#up').on("click", function(evt){
        var next_level_id = video.get("level") + 1
        var levels = steps.current().get("levels")
        var next_level = levels.filter(function(l){
          return l.id == next_level_id
        })[0]

        var start_at = steps.findWhere({id:next_level.start_step_id}).get("start_at")
        var end_at = steps.findWhere({id:next_level.end_step_id}).get("end_at")


        video.set({"step":1, "level":next_level_id})

        $('#from').html(App.ViewHelper.formatTime(start_at))
        $('#to').html(App.ViewHelper.formatTime(end_at))

        pop.destroy();
        pop = Popcorn("#video");
        pop.on("timeupdate", function(){
          $('#current-time').html(App.ViewHelper.formatTime(pop.currentTime()))
        })

        pop.cue( end_at, function() {
          this.currentTime( start_at );
        });
        pop.currentTime( start_at);
        pop.play();
        console.log('time',pop.currentTime())
      })


    });
    steps.fetch()


});