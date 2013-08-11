(function() {
  var Video = Backbone.Model.extend({
      defaults: {
        "speed":  1,
        "level":  1,
        "step":   1
      },
      initialize: function() {
      }
  });
  App.Video = Video;
}());

