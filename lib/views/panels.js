define([
    'backbone.marionette',
    'app/views/panel',
    'app/models/panels'],

    function(Marionette, PanelView, Panels){

    var PanelsView = Marionette.CollectionView.extend({
        initialize: function(collection) {
            this.collection = collection;
        },
        tagName: 'div',
        childView: PanelView,
    });

    return PanelsView;
});
