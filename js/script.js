;(function() {
    var Game = function(canvasId) {

        //query selectors
        var canvas = document.getElementById("screen");
        var screen = canvas.getContext('2d');

        //gameSize
        var gameSize = { x: canvas.width, y: canvas.height };
        console.log("hi")
    
        this.bodies = createInvaders(this).concat(new Player(this, gameSize));
        console.log(this.bodies)
       

      // this.bodies = createPlayer(this, gameSize).concat(createInvaders(this));

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

for(var i = 0; i < this.bodies.length; i++) {
           if (this.bodies[i] instanceof Invader) {
            switch(i) {
            case 0: 
                drawKaylan(screen, this.bodies[0]);
                break;
            case 1: 
                drawBrian(screen, this.bodies[1]);
                break;
            case 2:
                drawJason(screen, this.bodies[2]);
                break

           case 3:
                drawKat(screen, this.bodies[3]);
                  break
            case 4:
                drawBoaz(screen, this.bodies[4]);
                  break
            case 5:
                drawThuy(screen, this.bodies[5]);
                  break
            case 6:
                drawThuy(screen, this.bodies[6]);
                  break
            case 7:
                drawThomas(screen, this.bodies[7]);
                  break
             case 8:
                drawWensie(screen, this.bodies[8]);
                  break
             case 9:
                drawNatalia(screen, this.bodies[9]);
                  break
            case 10:
                drawThuy(screen, this.bodies[10]);
                  break
             case 11:
                drawKat(screen, this.bodies[11]);
                  break
              case 12:
                drawJason(screen, this.bodies[12]);
                  break
              case 13:
                drawAri(screen, this.bodies[13]);
                  break
              case 14:
                drawAdan(screen, this.bodies[14]);
                  break
              case 15:
                drawAri(screen, this.bodies[15]);
                  break

            case 16:
             drawJosh(screen, this.bodies[16]);
                  break
             case 17:
                drawNatalia(screen, this.bodies[17]);
                  break
             case 18:
                drawThomas(screen, this.bodies[18]);
                  break
             case 19:
                drawChristie(screen, this.bodies[19]);
                  break
             case 20:
                drawWensie(screen, this.bodies[20]);
                  break
             case 21:
                drawJosh(screen, this.bodies[21]);
                  break
             case 22:
                drawTravis(screen, this.bodies[22]);
                  break
              case 23:
                drawBoaz(screen, this.bodies[23]);
                  break
            case 24:
                drawAdan(screen, this.bodies[24]);
                  break
            case 25:
                drawAdan(screen, this.bodies[25]);
                  break
           }
       }

            if (this.bodies[i] instanceof Bullet) {
                drawJason(screen, this.bodies[i]);
            }
            if (this.bodies[i] instanceof Player) {
                drawJustin(screen, this.bodies[i]);

            }
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
        this.size = { x: 29, y: 29};
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
        this.size = { x: 50, y: 50 };
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

    var createPlayer = function(game) {
            var player = []
            player.push(new Player(game, gameSize))
            return player;
        }



   
//drawingfolks

     var drawRect = function(screen, body) {
        //screen.fillRect(,
        // 
        //  body.size.x, body.size.y);//
        var imgRect = document.getElementById("cat");
        screen.drawImage(imgRect, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawJustin = function(screen, body) {
        //screen.fillRect(,
        // 
        //  body.size.x, body.size.y);//
        var imgPlayer = document.getElementById("justin");
        screen.drawImage(imgPlayer, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
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

      var drawChristie = function(screen, body) {

        var imgInvader = document.getElementById("christie");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

      var drawBrian = function(screen, body) {

        var imgInvader = document.getElementById("brian");
        screen.drawImage(imgInvader, body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
    };

    var drawTravis = function(screen, body) {

        var imgInvader = document.getElementById("travis");
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
