(function(Backbone, $, _, events) {

    KeyboardView = Backbone.View.extend({

        events: {
            'keyup': 'onKeyUp'
        },

        onKeyUp: function(e) {
            console.log(e.keyCode);
            switch(e.keyCode) {

                case 37: //left
                case 80: //(p)revious
                    events.trigger('step:prev');
                    break;

                case 38: //up
                case 85: //(u)p
                    events.trigger('step:up');
                    break;

                case 39: //right
                case 78: //(n)ext
                    events.trigger('step:next');
                    break;

                case 40: //down
                case 40: //(d)own
                    events.trigger('step:down');
                    break;

                case 32: //space
                case 13: //enter/return
                    break;
            }

        }
    });



    keyboardView = new KeyboardView({
        el: document
    });

  App.KeyboardView = KeyboardView
}(Backbone, jQuery, _, App.Events));
