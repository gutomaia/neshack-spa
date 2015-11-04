define([
    'underscore',
    'require',
    'backbone',
    'backbone.marionette',
    'text!app/templates/navbar_view.html'
    ],

    function(_, require, Backbone, Marionette, NavbarTemplate){

    var Navbar = Marionette.LayoutView.extend({

        initialize: function(app) {
            this.app = app;
            this.router = new Backbone.Router();
            this.router.route("Super_Mario_Bros", "smb", _.bind(this.smb, this));
            this.router.route("MegaMan_2", "mm2", _.bind(this.mm2, this));
        },

        template: function () {
            return NavbarTemplate;
        },

        smb: function() {
            var application = this.app;
            require(['app/views/smb'], function(SMBView){
                application.main.content.show(new SMBView())
            });
        },

        mm2: function() {
            var application = this.app;
            require(['app/views/megaman2'], function(MegaMan2View){
                application.main.content.show(new MegaMan2View())
            });
        },

        events: {
            'click a': 'open_url'
        },

        open_url: function(evt){
            Backbone.history.navigate(evt.currentTarget.pathname, {trigger: true});
            return false;
        },

    });

    return Navbar;
});
