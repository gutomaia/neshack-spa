if (typeof define !== 'function') { var define = require('amdefine')(module);}

define([
    'jquery',
    'backbone',
    'backbone.marionette',
    'underscore',
    'text!app/templates/main_view.html',
    'app/views/navbar'],

    function($, Backbone, Marionette, _, MainViewTemplate, NavBar){

    var MainView = Marionette.LayoutView.extend({
        template: function () {
            return MainViewTemplate;
        },
        regions: {
            navbar: '#navbar',
            content: '#page-wrapper'
        }
    });

    return MainView;
});
