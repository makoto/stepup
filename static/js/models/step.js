(function() {
  var Step = Backbone.Model.extend({
    initialize: function() {
      App.Events.on('step:next', _.bind(this.next, this));
    },
    next: function() {
        console.log('next!');
    }
  });
  App.Step = Step;
}());