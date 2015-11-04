define([
    'backbone',
    'app/models/panel'],

    function(Backbone, Panel){

    var Panels = Backbone.Collection.extend({
        model: Panel
    });

    return Panels;
});
