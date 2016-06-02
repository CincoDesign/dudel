/*jshint -W030 */

(function() {
  'use strict';

  document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });

  var xbox;
  var buttons;
  var XBOX_Buttons;

  window.addEventListener("gamepadconnected", function() {

    xbox = navigator.getGamepads()[0];
    buttons = xbox.buttons;

    XBOX_Buttons = [];

    XBOX_Buttons[0] = 'A';
    XBOX_Buttons[1] = 'B';
    XBOX_Buttons[2] = 'X';
    XBOX_Buttons[3] = 'Y';
    XBOX_Buttons[4] = 'LB';
    XBOX_Buttons[5] = 'RB';
    XBOX_Buttons[6] = 'LT';
    XBOX_Buttons[7] = 'RT';
    XBOX_Buttons[8] = 'SEL';
    XBOX_Buttons[9] = 'STR';
    XBOX_Buttons[10] = 'L3';
    XBOX_Buttons[11] = 'R3';
    XBOX_Buttons[12] = 'up';
    XBOX_Buttons[13] = 'down';
    XBOX_Buttons[14] = 'left';
    XBOX_Buttons[15] = 'right';
    XBOX_Buttons[16] = 'sync';
  });


  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  function resizeCanvas() {
    var _background;
    var temp_cnvs = document.createElement('canvas');
    var temp_cntx = temp_cnvs.getContext('2d');

    temp_cnvs.width = window.innerWidth;
    temp_cnvs.height = window.innerHeight;
    temp_cntx.fillStyle = _background; // the original canvas's background color
    temp_cntx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    temp_cntx.drawImage(canvas, 0, 0);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(temp_cnvs, 0, 0);
  }

  window.addEventListener('resize', resizeCanvas, false);

  resizeCanvas();

  // Mouse shit
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }



  function colorPhase(phase, x, y, z) {
    var color, red, green, blue, center, width, frequency;

    if (phase === undefined) phase = 0;

    center = 128;
    width = 127;
    frequency = Math.PI * 2 / 10;

    for (var i = 0; i < 100; ++i) {
      red = Math.sin(frequency * i + x + phase) * width + center;
      green = Math.sin(frequency * i + y + phase) * width + center;
      blue = Math.sin(frequency * i + z + phase) * width + center;

      color = 'rgb(' + Math.round(red) + ',' + Math.round(green) + ',' + Math.round(blue) + ')';
    }

    return color;
  }

  function Player() {
    this.settings = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      r: 2,
      g: 0,
      b: 4,
      height: 5,
      width: 5,
      size: 100,
      up: false,
      down: false,
      left: false,
      right: false,
      A: false,
      B: false,
      X: false,
      Y: false,
      RT: false,
      LT: false,
      RB: false,
      LB: false,
      speed: 5,
      color: 0,
      AxisX: 0,
      AxisY: 1,

      render: function() {
        this.updatePosition();
        // ctx.rect(this.x, this.y, this.size, this.size);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = colorPhase(this.color / 15, this.r, this.g, this.b);
        ctx.fill();
      },

      updatePosition: function() {
        if (xbox !== undefined) {
          this.up ? this.y = this.y + xbox.axes[this.AxisY] * this.speed : false;
          this.down ? this.y = this.y + xbox.axes[this.AxisY] * this.speed : false;
          this.left ? this.x = this.x + xbox.axes[this.AxisX] * this.speed : false;
          this.right ? this.x = this.x + xbox.axes[this.AxisX] * this.speed : false;
        }

        if (this.LB) this.speed = 2.5;
        else if (this.RB) this.speed = 10;
        else this.speed = 5;


        if (this.Y) {
          this.r = 1;
          this.g = 0;
          this.b = 5;
        } else {
          this.r = 2;
          this.g = 0;
          this.b = 4;
        }

        if (this.size >= 20) {
          this.RT ? this.size++ : false;
          this.LT ? this.size-- : false;
        } else {
          this.size = 20;
        }

      }
    };
  }

  var player1 = new Player();
  var player2 = new Player();

  var p1 = player1.settings;
  var p2 = player2.settings;

  p2.AxisY = 3;
  p2.AxisX = 2;

  var players = [p1];

  function renderGame() {
    players.forEach(function(p) {
      p.render();
    });
  }

  function wiredup() {
    canvas.addEventListener('touchmove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      var force = evt.targetTouches[0].force;

      console.log(evt.targetTouches[0].force);

      p1.x = evt.targetTouches[0].pageX;
      p1.y = evt.targetTouches[0].pageY;
      p1.color++;
      p1.size = force * 100;
      console.log(p1.size)
    }, false);

    // canvas.addEventListener('scroll', function(evt) {
    //   p1.size++;
    // }, false);
  }


  window.addEventListener('load', wiredup, false);

  (function animloop() {
    window.requestAnimationFrame(animloop, 1000 / 60);

    if (!p1.X) {
      if (p1.up || p1.down || p1.left || p1.right) {
        p1.color++;
      }
    }

    if (!p2.X) {
      if (p2.up || p2.down || p2.left || p2.right) {
        p2.color++;
      }
    }

    if (xbox !== undefined) {

      for (var i = 0; i < buttons.length; i++) {

        xbox.axes[p1.AxisY] < 0 ? p1.up = true : p1.up = false;
        xbox.axes[p1.AxisY] > 0 ? p1.down = true : p1.down = false;
        xbox.axes[p1.AxisX] > 0 ? p1.right = true : p1.right = false;
        xbox.axes[p1.AxisX] < 0 ? p1.left = true : p1.left = false;

        xbox.axes[p2.AxisY] < 0 ? p2.up = true : p2.up = false;
        xbox.axes[p2.AxisY] > 0 ? p2.down = true : p2.down = false;
        xbox.axes[p2.AxisX] > 0 ? p2.right = true : p2.right = false;
        xbox.axes[p2.AxisX] < 0 ? p2.left = true : p2.left = false;

        buttons[i].pressed ? p1[XBOX_Buttons[i]] = true : p1[XBOX_Buttons[i]] = false;
        buttons[i].pressed ? p2[XBOX_Buttons[i]] = true : p2[XBOX_Buttons[i]] = false;
      }
    }

    renderGame();
  })();
})();
