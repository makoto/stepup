(function() {
  var Videos = Backbone.Collection.extend({
    initialize: function(opts){
    },
    model: App.Level,
    url: function () {
      return "http://localhost:3001/videos.json"
    }
  }); 
  App.Videos = Videos;
}());
