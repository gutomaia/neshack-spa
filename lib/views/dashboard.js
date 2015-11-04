define([
    'backbone',
    'backbone.marionette',
    'app/views/panels',
    'app/views/screen',
    'text!app/templates/dashboard_view.html'],

    function(Backbone, Marionette, PanelsView, ScreenView, DashBoardTemplate){


    var DashBoardView = Marionette.LayoutView.extend({

        template: function () {
            return DashBoardTemplate;
        },

        ui: {
            panels: '.panels',
            charts: '.charts'
        },

        regions: {
            panels: '@ui.panels',
            charts: '@ui.charts'
        },

        onRender: function() {
            // this.getRegion('panels').show(new PanelsView());
            // this.getRegion('charts').show(new ScreenView());
        }
    });

    return DashBoardView;
});
