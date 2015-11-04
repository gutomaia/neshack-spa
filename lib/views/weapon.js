define([
    'underscore',
    'backbone.marionette',
    'backbone.wreqr',
    'text!app/templates/weapon_view.html'],

    function(_, Marionette, Wreqr, PanelTemplate){

    var WeaponView = Marionette.ItemView.extend({
        
        initialize: function(model) {
            var inbox = Wreqr.radio.channel('inbox');
            inbox.vent.on('game', _.bind(this.update, this));
            this.dataName = this.model.get('dataName');
            this.data = -1;
        },

        template: PanelTemplate,

        ui: {
            data: '.huge'
        },

        events: {
            'click a': 'open_url'
        },

        open_url: function(evt){
            Backbone.history.navigate(evt.currentTarget.pathname, {trigger: true});
            return false;
        },

        update: function(data){
            actual = data[this.dataName];
            if (actual != this.data) {
                this.data = actual;
                this.ui.data.html(actual);
            }
        },

        render: function(){
            var template = _.template(PanelTemplate);
            this.$el.html(template( this.model.toJSON() ));
            this.bindUIElements();
        }
    });

    return WeaponView;
});
