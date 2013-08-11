var ControlsView = Backbone.View.extend({
    el: $("#controls"),
    events: {
      'change input': 'speedChange'
    },

    initialize: function() {
      $("#speed").html(this.model.get("speed"))
    },
    speedChange: function(d){
      this.model.set("speed", d.target.value)
      $("#speed").html(d.target.value)
    }
});
