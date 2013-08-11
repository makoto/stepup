$( document ).ready(function() {
    var video = new App.Video()
    App.video = video
    video.set({"step":1, "level":1})
    var stepsView = new App.StepsView({
        el: '#score',
        model: video
    });
    App.stepsView = stepsView
    controlsView = new App.ControlsView({model:video})
    steps = new App.Steps({video: video})

    levels = new App.Levels({video: video})
    levels.fetch()
    console.log('3', video.get("level"))
    levels.on("sync", function(eventName) {
      steps = this.getSteps(video.get("level"))
      console.log(4, steps)
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

      $('#up').on("click", function(evt){
        var next_level_id = video.get("level") + 1
        steps = levels.getSteps(next_level_id)
        step = levels.getStep(next_level_id, pop.currentTime())
        console.log('steps', steps, 'step', step)
        video.set({"step":step.get('id'), "level":next_level_id})

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
        console.log('time',pop.currentTime())
      })


    });
    steps.fetch()


});