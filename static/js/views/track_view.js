(function() {

  App.TrackModel = Backbone.Model.extend({

  });

  App.TrackView = Backbone.View.extend({

    events: {
      'click': 'toPercent'
    },

    initialize: function() {
      console.log('init track');

      var width = this.$el.width();
      this.model.set('width', width);

    },

    toPercent: function(e) {

      var trackPos = this.$el.offset(),
        x          = e.clientX - trackPos.left,
        y          = e.clientY - trackPos.top,
        width      = this.model.get('width'),
        percent    = Math.floor(x / width * 100);

      console.log(percent);
    }


  });



  var m = new App.TrackModel(),
      v = new App.TrackView({ model: m, el: '#track' });











}());
