if (typeof define !== 'function') { var define = require('amdefine')(module);}

define([
    'backbone',
    'backbone.marionette',
    'backbone.wreqr',
    'socket.io',
    'app/views/main',
    'app/views/navbar',
    'app/views/dashboard'
    ],
    // 'backbone.wreqr'

    function(Backbone, Marionette, Wreqr, io, MainView, NavBar, DashBoardView){


    var inbox = Wreqr.radio.channel('inbox');

    var socket = io.connect();
    // var socket = io();

    socket.emit('subscribe');
    socket.on('game', function(data) {
        inbox.vent.trigger('game', data);
    });

    var NESHackApp = new Marionette.Application();

    if (typeof window === 'object') {
        window.NESHackApp = NESHackApp;
    }

    NESHackApp.addRegions({
        app: '#wrapper'
    });

    NESHackApp.addInitializer(function() {
        // NESHackApp.router = new Backbone.Router();

        // NESHackApp.navbar = new NavBar();
        // NESHackApp.sidebar = new SideBar();

        var main = new MainView();
        NESHackApp.app.show(main);
        NESHackApp.main = main;

        NESHackApp.main.content.show(new DashBoardView());
        NESHackApp.main.navbar.show(new NavBar(NESHackApp));

        // main.navbar.show(NESHackApp.navbar);
        // main.sidebar.show(NESHackApp.sidebar);

        // main.cinemas = new CinemasView({app:NESHackApp});
        // main.cinema = new CinemaView({app:NESHackApp});

        Backbone.emulateHTTP = true;
        Backbone.history.start({pushState: true, hashChange: false, root:'/'});
    });

    return NESHackApp;
});
