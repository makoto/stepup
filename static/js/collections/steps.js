(function() {
  var Steps = Backbone.Collection.extend({
    initialize: function(opts){
      this.video = opts.video;
      this.on("sync", function(data){
        opts.video.set("step", data.first().get("id"))
      })
    },
    current: function(){
      return this.findWhere({id:this.video.get("step")})
    },
    next: function(){
      this.video.set("step", this.video.get("step") + 1)
      return this.findWhere({id:this.video.get("step")})
    },
    model: App.Step,
    url: function () {
      return "/data/steps.json"
    }
  });
  App.Steps = Steps;
}());
