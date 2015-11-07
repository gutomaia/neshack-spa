define([
    'backbone.marionette',
    'backbone.wreqr',
    'text!app/templates/weapons_view.html'],

    function(Marionette, Wreqr, WeaponsTemplate){

    var WeaponsView = Marionette.ItemView.extend({

        initialize: function() {
            this.inbox = Wreqr.radio.channel('inbox');
            this.inbox.vent.on('game', _.bind(this.update, this));
            this.data = -1;
        },

        model: [
                {name:'Crash Bomb', boss:'Crashman', p:1, have:false},
                {name:'Metal Blade', boss:'Metalman', p:2, have:false},
                {name:'Time Stopper', boss:'Flashman', p:4, have:false},
                {name:'Quick Boomerang', boss:'Quickman', p:8, have:false},
                {name:'Bubble Lead', boss:'Bubbleman', p:16, have:false},
                {name:'Leaf Shield', boss:'Woodman', p:32, have:false},
                {name:'Air Shooter', boss:'Airman', p:64, have:false},
                {name:'Atomic Fire', boss:'Heatman', p:128, have:false}
        ],

        serializeModel: function(model) {
            return model;
        },

        ui: {
            crash_bomb: '.power-1',
            metal_blade: '.power-2',
            time_stopper: '.power-4',
            quick_boomerang: '.power-8',
            bubble_lead: '.power-16',
            leaf_shield: '.power-32',
            air_shooter: '.power-64',
            atomic_fire: '.power-128',
        },

        events: {
            'click [type="checkbox"]': 'clicked'
        },

        template: function(serialized_model) {
            var template = _.template(WeaponsTemplate);
            return template({weapons:serialized_model});
        },

        clicked: function(evt) {
            var data = 0;
            for (var u in this.ui) {
                if (this.ui[u][0].checked === true) {
                    data = data | this.ui[u][0].value;
                }
            }
            this.inbox.vent.trigger('hack', {weapons: data});
        },

        update: function(data){
            var actual = data.weapons;
            if (actual != this.data) {
                for (var u in this.ui) {
                    var p = parseInt(this.ui[u][0].value);
                    this.ui[u][0].checked = ((actual & p) === p);
                }
                this.data = actual;
            }
        },

        onRender: function(){
            this.bindUIElements();
        }
    });

    return WeaponsView;
});
