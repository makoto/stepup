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
            this.model.on('change', _.bind(this.selectCell, this));
        },

        onClickButton: function(e) {

            var $button = $(e.target);

            this.model.set({
                step: $button.data('step'),
                position: $button.data('position')
            });

        },

        selectCell: function(opts) {

            if( !opts.changed.step || !opts.changed.position) { return; }

            console.log(opts.changed);
            this.$el.find('.selected-row').removeClass('selected-row');
            this.$el.find('.selected-measure').removeClass('selected-measure');

            var changed = opts.changed,
                $row    = this.$el.find('.step-' + changed.step ),
                $button = $row.find('[data-position=' + changed.position + ']');

            $row.addClass('selected-row');
            $button.parent('li').addClass('.selected-measure');

        }
    });


    var measuresModel = new MeasuresModel();
    var measuresView = new MeasuresView({
        el: '#score',
        model: measuresModel
    });
    App.MeasuresView = MeasuresView
}(Backbone, $, _, eventBus));
