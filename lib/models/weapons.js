define([
    'backbone',
    'app/models/weapon'],

    function(Backbone, Weapon){

    var Weapons = Backbone.Collection.extend({
        model: Weapon
    });

    return Weapons;
});
