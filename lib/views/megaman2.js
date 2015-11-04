define([
    'backbone',
    'backbone.marionette',
    'app/models/panels',
    'app/views/panels',
    'app/views/weapons',
    'text!app/templates/dashboard_view.html'],

    function(Backbone, Marionette, Panels, PanelsView, WeaponsView, DashBoardTemplate){


    var Megaman2View = Marionette.LayoutView.extend({

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
                    {title:'Lives', icon:'fa-male', color:'green', dataName:'lives'}
                ])
            ));
            this.getRegion('charts').show(new WeaponsView());
        }
    });

    return Megaman2View;
});
