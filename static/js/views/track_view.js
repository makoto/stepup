(function() {

  App.MarkerSourceView = Backbone.View.extend({
  
    initialize: function() {

       this.$el.find('.marker').draggable({
       
       
       });
    }
  
  });

  App.TrackModel = Backbone.Model.extend({});

  App.TrackView = Backbone.View.extend({

    events: {
      'click': 'toPercent'
    },

    initialize: function() {

      var view = this;

      this.$el.droppable({
        accept: '.marker',
        hoverClass: 'drop-hover',
        drop: _.bind(view.onDrop, view)
      });

      var width = this.$el.width();
      this.model.set('width', width);

    },

    onDrop: function(e, ui) {
      this.$el.append(ui.draggable);
      ui.draggable.css('top', 60);
      this.toPercent(e);
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
      v = new App.TrackView({ model: m, el: '#track' }),
      s = new App.MarkerSourceView({ el: '#marker-source' });











}());
