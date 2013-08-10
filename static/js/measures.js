(function(Backbone, $, _) {

    var MeasuresModel = Backbone.Model.extend();
    var MeasuresView = Backbone.View.extend({

        events: {
            'click button': 'onClickButton'
        },

        initialize: function() {
            this.model.on('change', _.bind(this.selectCell, this));

            console.log('Init MeasuresView');
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

            this.$el.find('.selected').removeClass('selected');

            var changed = opts.changed,
                $row    = this.$el.find('.step-' + changed.step ),
                $button = $row.find('[data-position=' + changed.position + ']');

            $row.addClass('selected');
            $button.parent('li').addClass('.selected');

        }

    });


    var measuresModel = new MeasuresModel();
    var measuresView = new MeasuresView({ 
        el: '#score',
        model: measuresModel
    });


}(Backbone, $, _));
