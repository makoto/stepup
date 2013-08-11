$( document ).ready(function() {
    var video = new App.Video()
    App.video = video
    video.set({"step":1, "level":1})
    var stepsView = new App.StepsView({
        el: '#score',
        model: video
    });
    controlsView = new App.ControlsView({model:video})

    levels = new App.Levels({video: video})
    levels.fetch()
    levels.on("sync", function(eventName) {
      steps = this.getSteps(video.get("level"))
      var step = steps.current()
      $('#from').html(App.ViewHelper.formatTime(step.get('start_at')))
      $('#to').html(App.ViewHelper.formatTime(step.get('end_at')))
      
      pop = Popcorn("#video");

      video.on("change:speed", function(){
        pop.playbackRate(this.get("speed"))
      })

      $('#play').on("click", function(evt){
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
        $('#from').html(App.ViewHelper.formatTime(step.get('start_at')))
        $('#to').html(App.ViewHelper.formatTime(step.get('end_at')))
        
        pop.cue( step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        pop.currentTime( step.get("start_at") );
        pop.play();
      })

      $('#back').on("click", function(evt){
        step = steps.back()
        $('#from').html(App.ViewHelper.formatTime(step.get('start_at')))
        $('#to').html(App.ViewHelper.formatTime(step.get('end_at')))

        pop.cue( step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        pop.currentTime( step.get("start_at") );
        pop.play();
      })

      var resetCue = function(pop, levelid){
        steps = levels.getSteps(levelid)
        step = levels.getStep(levelid, pop.currentTime())
        video.set({"step":step.get('id'), "level":levelid})

        $('#from').html(App.ViewHelper.formatTime(step.get('start_at')))
        $('#to').html(App.ViewHelper.formatTime(step.get('end_at')))

        pop.destroy();
        pop = Popcorn("#video");
        pop.on("timeupdate", function(){
          $('#current-time').html(App.ViewHelper.formatTime(pop.currentTime()))
        })

        pop.cue( step.get('end_at'), function() {
          this.currentTime( step.get('start_at') );
        });
        pop.currentTime( step.get('start_at'));
        pop.play();
        return pop
      }

      $('#down').on("click", function(evt){
        var next_level_id = video.get("level") - 1
        resetCue(pop, next_level_id)
      })

      $('#up').on("click", function(evt){
        var next_level_id = video.get("level") + 1
        resetCue(pop, next_level_id)
      })


    });

});