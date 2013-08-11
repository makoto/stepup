(function(Backbone, $, _, events) {

    LeapmotionView = Backbone.View.extend({

        initialize: function(opts) {

            var onGesture = this.onGesture;

            this.debouncedGesture = _.debounce(onGesture, 100, true);

            opts.lm.loop({ enableGestures: true }, _.bind(this.onLoop, this));

        },

        onLoop: function(obj) {

            var view = this;

            if (obj.gestures.length > 0) {
                obj.gestures.forEach(view.debouncedGesture);
            }

        },

        onGesture: function(gesture) {
            if (gesture.type !== "swipe") return;

            if (gesture.direction[0] > 0.5) {
                console.log("RightSwipe");
                events.trigger('step:next');
            }
            else if (gesture.direction[0] < -0.5){
                console.log("LeftSwipe");
                events.trigger('step:prev');
            }
            else if(gesture.direction[1] > 0.5){
                console.log("UpSwipe");
                events.trigger('step:up');
            }
            else if(gesture.direction[1] < -0.5){
                console.log("DownSwipe");
                events.trigger('step:down');
            }
        }
    });

  App.LeapmotionView = LeapmotionView;

}(Backbone, jQuery, _, App.Events));

