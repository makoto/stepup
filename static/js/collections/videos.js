(function() {
  var Videos = Backbone.Collection.extend({
    initialize: function(opts){
    },
    model: App.Level,
    url: function () {
      return "http://stepupback.herokuapp.com/videos.json"
    }
  }); 
  App.Videos = Videos;
}());
