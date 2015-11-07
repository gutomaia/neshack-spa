define([
    'underscore',
    'backbone.marionette',
    'backbone.wreqr',
    'phaser'],

    function(_, Marionette, Wreqr, Phaser){

    var ScreenView = Marionette.LayoutView.extend({

        template: false,

        initialize: function () {
            this.game = {};
            var inbox = Wreqr.radio.channel('inbox');
            inbox.vent.on('game', _.bind(this.updateData, this));
            this.enemies = [];
            this.enemiesUpdated = false;
        }, 

        updateData: function(data) {
            this.enemies = data.enemies;
            this.enemiesUpdated = true;
        },

        createGame: function() {
            this.game.stage.disableVisibilityChange = true;
        },

        updateFrame: function() {
            if (this.enemiesUpdated) {
                this.game.world.removeAll();
                for (var e in this.enemies) {
                    var i = this.enemies[e];
                    this.drawSprite(i.x,i.y);
                }
                this.enemiesUpdated = false;
            }
        },

        drawSprite: function(x, y) {
            var graphics = this.game.add.graphics(x, y);
            graphics.boundsPadding = 0;
            graphics.beginFill(0xFFFF00, 1);
            graphics.bounds = new PIXI.Rectangle(x, y, 8, 8);
            graphics.drawRect(x, y, 8, 8);
        },

        onShow: function(view, region, options){
            region.el.id = 'game';
            console.log(region);
            this.game = new Phaser.Game(256, 256, Phaser.AUTO, 'game',
                {
                    create: _.bind(this.createGame, this),
                    update: _.bind(this.updateFrame, this)
                }
            );
        },
    });

    return ScreenView;
});
