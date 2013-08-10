var ControlsView = Backbone.View.extend({
    el: $("#controls"),
    events: {
      'change input': 'speedChange'
    },

    initialize: function() {
    },
    speedChange: function(d){
      // console.log('changed', this.model.get("speed"), d.target.value)
      this.model.set("speed", d.target.value)
      $("#speed").html(d.target.value)
    }
});
