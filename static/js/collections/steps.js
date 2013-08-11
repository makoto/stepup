(function() {
  var Steps = Backbone.Collection.extend({
    initialize: function(){
      this.on("sync", function(data){
        App.video.set("step", data.first().get("id"))
      })
    },
    current: function(){
      return this.findWhere({id:App.video.get("step")})
    },
    next: function(){
      App.video.set("step", App.video.get("step") + 1)
      return this.findWhere({id:App.video.get("step")})
    },
    model: App.Step,
    url: function () {
      return "/data/steps.json"
    }
  });
  App.Steps = Steps;
}());
