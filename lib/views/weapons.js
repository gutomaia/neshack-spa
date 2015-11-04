define([
    'backbone.marionette',
    'backbone.wreqr',
    'app/views/weapon',
    'app/models/weapons',
    'text!app/templates/weapons_view.html'],

    function(Marionette, Wreqr, WeaponView, Weapons, WeaponsTemplate){

    var WeaponsView = Marionette.CompositeView.extend({

        initialize: function(collection) {
            this.collection = new Weapons([
                {name:'Crash Bomb', boss:'Crashman', p:1, have:false},
                {name:'Metal Blade', boss:'Metalman', p:2, have:false},
                {name:'Time Stopper', boss:'Flashman', p:4, have:false},
                {name:'Quick Boomerang', boss:'Quickman', p:8, have:false},
                {name:'Bubble Lead', boss:'Bubbleman', p:16, have:false},
                {name:'Leaf Shield', boss:'Woodman', p:32, have:false},
                {name:'Air Shooter', boss:'Airman', p:64, have:false},
                {name:'Atomic Fire', boss:'Heatman', p:128, have:false}
            ]);

            var inbox = Wreqr.radio.channel('inbox');
            inbox.vent.on('game', _.bind(this.update, this));
            this.data = -1;
        },

        ui: {
            power1: '.power-1'
        },

        events: {
            'click checkbox': 'change_weapons'
        },

        template: WeaponsTemplate,
        childViewContainer: '.list-group',
        childView: WeaponView,

        change_weapons: function(evt) {
            console.log('chage');
        },

        update: function(data){
            actual = data.weapons;
            if (actual != this.data) {
                this.collection.each(function(weapon){
                    var p = weapon.get('p');
                    weapon.set('have', (actual & p == p));
                })
                this.data = actual;
            }
        }

    });

    return WeaponsView;
});
