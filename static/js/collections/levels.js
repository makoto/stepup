(function() {
  var Levels = Backbone.Collection.extend({
    initialize: function(opts){
      // this.on("sync", function(data){
      //   opts.video.set("step", data.first().get("id"))
      // })
    },
    model: App.Level,
    url: function () {
      return "http://makoto.github.io/stepup/data/levels.json"
    },
    getStep: function(levelid, time) {
      var steps = this.getSteps(levelid)
      var foundStep = steps.filter(function(step) {
        return step.get('start_at') < time && step.get('end_at') > time;
      })[0];
      // console.log(levelid, foundStep.get(start_at, foundStep.end_at);
      return foundStep
    },
    getSteps: function(levelid){
      var stepsJson = this.findWhere({ id: levelid }).get("steps")
      return new App.Steps(stepsJson);
    }
  });
  App.Levels = Levels;
}());
