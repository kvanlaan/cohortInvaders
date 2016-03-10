;
(function() {
    var Game = function(canvasId) {

    	//query selectors
        var canvas = document.getElementById("screen");
        var screen = canvas.getContext('2d');
        var imgRect = document.getElementById("justin");
        var imgJason = document.getElementById("jason");
        var imgKaylan = document.getElementById("kaylan");
        var imgJosh = document.getElementById("josh");
        var imgThuy = document.getElementById("thuy");
        var imgAdan = document.getElementById("adan");
        var imgNatalia = document.getElementById("natalia");
        var imgWensie = document.getElementById("wensie");
        var imgBoaz = document.getElementById("boaz");
        var imgMichael = document.getElementById("michael");
        var imgAri = document.getElementById("ari");

        //gameSize
        var gameSize = { x: canvas.width, y: canvas.height };
        console.log("hi")
            //this.bodies = createInvaders(this).concat(new Player(this, gameSize));

        var createPlayer = function(game) {
            var player = []
            player.push(new Player(this, gameSize))
            return player;
        }


        this.bodies = createPlayer(this, gameSize).concat(createInvaders(this));

        var self = this;
        loadSound("shoot.wav", function(shootSound) {
            self.shootSound = shootSound;
            var tick = function() {
                self.update();
                self.draw(screen, gameSize);
                requestAnimationFrame(tick);
            };
            tick();
        });
    };
    Game.prototype = {
        update: function() {
            var bodies = this.bodies;
            var notCollidingWithAnything = function(b1) {
                return bodies.filter(function(b2) {
                    return colliding(b1, b2);
                }).length === 0;
            };

            this.bodies = this.bodies.filter(notCollidingWithAnything);
            for (var i = 0; i < this.bodies.length; i++) {
                this.bodies[i].update();
            }
        },

        draw: function(screen, gameSize) {
            screen.clearRect(0, 0, gameSize.x, gameSize.y);
            drawJason(screen, this.bodies[1]);
            drawKaylan(screen, this.bodies[2]);
            drawAdan(screen, this.bodies[3]);
            drawThuy(screen, this.bodies[4]);
            drawNatalia(screen, this.bodies[5]);
            drawWensie(screen, this.bodies[6]);
            drawJosh(screen, this.bodies[7]);
            drawKat(screen, this.bodies[8]);
            drawThomas(screen, this.bodies[9]);
            drawMichael(screen, this.bodies[10]);
            drawBoaz(screen, this.bodies[11]);

            drawRect(screen, this.bodies[0]);
            for (var i = 12; i < this.bodies.length; i++) {
                drawRect(screen, this.bodies[i]);
            }

        },

        addBody: function(body) {
            this.bodies.push(body);
        },

        invadersBelow: function(invader) {
            return this.bodies.filter(function(b) {
                return b instanceof Invader &&
                    b.center.y > invader.center.y &&
                    b.center.x - invader.center.x < invader.size.x;
            }).length > 0;
        }
    }
//Invaders
    var Invader = function(game, center) {
        this.game = game;
        this.size = { x: 15, y: 15 };
        this.center = center;
        this.patrolX = 0;
        this.speedX = 0.3;
    }

    Invader.prototype = {
        update: function() {
            if (this.patrolX < 0 || this.patrolX > 40) {
                this.speedX = -this.speedX;
            }
            this.center.x += this.speedX;
            this.patrolX += this.speedX;
            if (Math.random() > 0.995 && !this.game.invadersBelow(this)) {
                var bullet = new Bullet({ x: this.center.x, y: this.center.y + this.size.x / 2 }, { x: Math.random() - 0.5, y: 2 });
                this.game.addBody(bullet);

            }
        }
    };

    var createInvaders = function(game) {
        var invaders = []
        for (var i = 0; i < 24; i++) {
            var x = 30 + (i % 8) * 30;
            var y = 30 + (i % 3) * 30;
            invaders.push(new Invader(game, { x: x, y: y }));
        }
        return invaders;
    }

//bullets
    var Bullet = function(center, velocity) {
        this.size = { x: 3, y: 3 };
        this.center = center;
        this.velocity = velocity;
    };


    Bullet.prototype = {
        update: function() {
            this.center.x += this.velocity.x;
            this.center.y += this.velocity.y;

        }
    };
//Player
    var Player = function(game, gameSize) {
        this.game = game;
        this.size = { x: 40, y: 40 };
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.x };
        this.keyboarder = new Keyboarder();
    };
    

    Player.prototype = {
        update: function() {
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
                this.center.x -= 2;
            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
                this.center.x += 2;

            }
            if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
                var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.x / 2 }, { x: 0, y: -6 });
                this.game.addBody(bullet);
                this.game.shootSound.load();
                this.game.shootSound.play();
            }
        }
    };

   
//drawingfolks
    var drawRect = function(screen, body) {
        //screen.fillRect(,
        // 
        //  body.size.x, body.size.y);//
        var imgRect = document.getElementById("justin");
        screen.drawImage(imgRect, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawJason = function(screen, body) {

        var imgInvader = document.getElementById("jason");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawKaylan = function(screen, body) {

        var imgInvader = document.getElementById("kaylan");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawJosh = function(screen, body) {

        var imgInvader = document.getElementById("josh");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawWensie = function(screen, body) {

        var imgInvader = document.getElementById("wensie");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };


    var drawNatalia = function(screen, body) {

        var imgInvader = document.getElementById("natalia");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawThuy = function(screen, body) {

        var imgInvader = document.getElementById("thuy");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawAdan = function(screen, body) {

        var imgInvader = document.getElementById("adan");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawKat = function(screen, body) {
        var imgInvader = document.getElementById("katrina");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawMichael = function(screen, body) {

        var imgInvader = document.getElementById("michael");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawBoaz = function(screen, body) {

        var imgInvader = document.getElementById("boaz");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawAri = function(screen, body) {

        var imgInvader = document.getElementById("ari");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawThomas = function(screen, body) {

        var imgInvader = document.getElementById("thomas");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

//enddrawingfolks


//Keystrokes//
    var Keyboarder = function() {
        var keyState = {}
        window.onkeydown = function(e) {
            keyState[e.keyCode] = true;
        };
        window.onkeyup = function(e) {
            keyState[e.keyCode] = false;
        };
        this.isDown = function(keyCode) {
            return keyState[keyCode] === true;
        };
        this.KEYS = {
            LEFT: 37,
            RIGHT: 39,
            SPACE: 32
        };

    };
    var colliding = function(b1, b2) {
        return !(b1 === b2 ||
            b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
            b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
            b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
            b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
    };

    var loadSound = function(url, callback) {
        var loaded = function() {
            callback(sound);
            sound.removeEventListener('canplaythrough', loaded);
        }
        var sound = new Audio(url);
        sound.addEventListener('canplaythrough', loaded);
        sound.load();
    };

    window.onload = function() {
        new Game("screen");
    };
})();
