(function(Backbone, $, _, events) {

    var MeasuresModel = Backbone.Model.extend({

        initialize: function() {
            events.on('step:next', _.bind(this.next, this));
        },

        next: function() {
            console.log('next!');
        }

    });

    var MeasuresView = Backbone.View.extend({

        events: {
            'click button': 'onClickButton'
        },

        initialize: function() {
            console.log('measuresview init');
            this.model.on('change', _.bind(this.selectCell, this));
        },

        onClickButton: function(e) {
            console.log('click');

            var $button = $(e.target);

            this.model.set({
                step: $button.data('step'),
                level: $button.data('level')
            });

        },

        selectCell: function(opts) {

            if( !opts.changed.step || !opts.changed.level) { return; }

            console.log(opts.changed);
            this.$el.find('.selected-level').removeClass('selected-level');
            this.$el.find('.selected-step').removeClass('selected-step');

            var changed = opts.changed,
                $level  = this.$el.find('.level-' + changed.level ),
                $button = $level.find('[data-step=' + changed.step + ']');

            $level.addClass('selected-level');
            $button.parent('li').addClass('selected-step');

        }
    });


    var measuresModel = new MeasuresModel();
    var measuresView = new MeasuresView({
        el: '#score',
        model: measuresModel
    });
    App.MeasuresView = MeasuresView
}(Backbone, $, _, eventBus));
