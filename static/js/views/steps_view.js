(function(Backbone, $, _, events) {

    var StepsView = Backbone.View.extend({

        initialize: function() {
            this.model.on('all', function(name){
              console.log('all', name)
            });
            
            this.model.on('change:level', _.bind(this.selectCell, this));
            this.model.on('change:step', _.bind(this.selectCell, this));
        },

        selectCell: function(model) {
            console.log('should be video', model)
            this.$el.find('.selected-level').removeClass('selected-level');
            this.$el.find('.selected-step').removeClass('selected-step');

            var $level    = this.$el.find('.level-' + model.get("level") ),
                $button = $level.find('[data-step=' + model.get("step") + ']');

            $level.addClass('selected-level');
            $button.parent('li').addClass('selected-step');

        }
    });
    App.StepsView = StepsView
}(Backbone, $, _, App.Events));
