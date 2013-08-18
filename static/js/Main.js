$( document ).ready(function() {
    var cues = []

    levels = new App.Levels()
    videos = new App.Videos()
    videos.fetch()

    videos.on("sync", function(){
      // Assuming only one query param for onw
      var video_id = location.search.split("=")[1]

      if (video_id) {
        App.video = videos.where({id: parseInt(video_id)})[0]
      }else{
        App.video = videos.first()
      };
      App.video.set({"step":1, "level":1})
      var stepsView = new App.StepsView({
          el: '#score',
          model: App.video
      });
      controlsView = new App.ControlsView({model:App.video})
      keyboardView = new App.KeyboardView({el:document})
      leapmotionView = new LeapmotionView({lm:Leap})
      levels.reset(App.video.get("levels"))
    })

    levels.on("reset", function(eventName) {
      steps = this.getSteps(App.video.get("level"))
      var step = steps.current()
      $('#from').html(App.ViewHelper.formatTime(step.get('start_at')))
      $('#to').html(App.ViewHelper.formatTime(step.get('end_at')))
      
      var pop = Popcorn.youtube("#video", App.video.get("url"));
      pop.controls(false)
      pop.on("timeupdate", function(){
        $('#current-time').html(App.ViewHelper.formatTime(pop.currentTime()))
      })

      var removeCues = function(){
        _.uniq(cues).forEach(function(c){
          console.log('Removing id' + c)
          pop.removeTrackEvent( 'id' + c);
        })
        cues = []
      }

      var moveCue = function(step){
        $('#from').html(App.ViewHelper.formatTime(step.get('start_at')))
        $('#to').html(App.ViewHelper.formatTime(step.get('end_at')))

        removeCues()
        pop.cue( 'id' + step.get("end_at"), function() {
          this.currentTime( step.get("start_at") );
        });
        cues.push(step.get("end_at"))
        pop.cue( 'id' + step.get("end_at"), step.get("end_at"))

        pop.currentTime( step.get("start_at") );
        pop.play();
      }

      var resetCue = function(levelid){
        steps = levels.getSteps(levelid)
        step = levels.getStep(levelid, pop.currentTime())
        App.video.set({"step":step.get('id'), "level":levelid})

        removeCues()
        moveCue(step)
      }

      App.video.on("change:speed", function(){
        pop.playbackRate(this.get("speed"))
      })

      $('#play').on("click", function(evt){
        moveCue(step)
      })

      $('#next').on("click", function(evt){
        moveCue(steps.next())
      })

      App.Events.on('step:next', function() {
        moveCue(steps.next());
      });

      $('#back').on("click", function(evt){
        moveCue(steps.prev())
      })

      App.Events.on('step:prev', function() {
        moveCue(steps.prev());
      });

      $('#down').on("click", function(){
        var next_level_id = App.video.get("level") - 1
        resetCue(next_level_id)
      })

      App.Events.on('step:down', function() {
        var next_level_id = App.video.get("level") - 1
        resetCue(next_level_id)
      });


      $('#up').on("click", function(evt){
        var next_level_id = App.video.get("level") + 1
        resetCue(next_level_id)
      })

      App.Events.on('step:up', function() {
        var next_level_id = App.video.get("level") + 1
        resetCue(next_level_id)
      });

    });

});