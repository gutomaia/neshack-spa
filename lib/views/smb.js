define([
    'backbone',
    'backbone.marionette',
    'app/models/panels',
    'app/views/panels',
    'app/views/screen',
    'text!app/templates/dashboard_view.html'],

    function(Backbone, Marionette, Panels, PanelsView, ScreenView, DashBoardTemplate){


    var SuperMarioView = Marionette.LayoutView.extend({

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
            this.getRegion('panels').show(new PanelsView(
                new Panels([
                    {title:'Score', icon:'fa-rocket', color:'primary', dataName:'score'},
                    {title:'Lives', icon:'fa-male', color:'green', dataName:'lives'},
                    {title:'Coin', icon:'fa-bitcoin', color:'yellow', dataName:'coin'},
                    {title:'Time', icon:'fa-clock-o', color:'red', dataName:'time'}
                ])
            ));
            this.getRegion('charts').show(new ScreenView());
        }
    });

    return SuperMarioView;
});
