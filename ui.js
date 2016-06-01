var xbox = navigator.getGamepads()[0];
var buttonText;
var buttonArray = [];

buttons = xbox.buttons;

// var A, B, X, Y, LB, RB, LT, RT, UP, DOWN, LEFT, RIGHT;

console.log(buttons[0]);

console.log(xbox);

var canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

var XBOX_Buttons = [];
var XBOX_Axes = [];

  XBOX_Buttons[0] = 'A',
  XBOX_Buttons[1] = 'B',
  XBOX_Buttons[2] = 'X',
  XBOX_Buttons[3] = 'Y',
  XBOX_Buttons[4] = 'LB',
  XBOX_Buttons[5] = 'RB',
  XBOX_Buttons[6] = 'LT',
  XBOX_Buttons[7] = 'RT',
  XBOX_Buttons[8] = 'SEL',
  XBOX_Buttons[9] = 'STR',
  XBOX_Buttons[10] = 'L3',
  XBOX_Buttons[11] = 'R3',
  XBOX_Buttons[12] = 'up',
  XBOX_Buttons[13] = 'down',
  XBOX_Buttons[14] = 'left',
  XBOX_Buttons[15] = 'right',
  XBOX_Buttons[16] = 'sync';

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function RGB2Color(r,g,b)
{
  return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
}

function colorPhase(phase)
{
  if (phase === undefined) phase = 0;
  center = 128;
  width = 127;
  frequency = Math.PI*2 / 1000;
  var color;

  for (var i = 0; i < 100; ++i) {
     red   = Math.sin(frequency*i+2+phase) * width + center;
     green = Math.sin(frequency*i+0+phase) * width + center;
     blue  = Math.sin(frequency*i+4+phase) * width + center;

     color = 'rgb(' + Math.round(red) + ',' + Math.round(green) + ',' + Math.round(blue) + ')';
  }

  // console.log(color);

  return color;
}

var Player = {
  x: 200,
  y: 250,
  height: 5,
  width: 5,
  size: 50,
  up: false,
  down: false,
  left: false,
  right: false,
  A: false,
  B: false,
  speed: 10,
  color: 0,
  render: function() {
    this.updatePosition();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 3*Math.PI);
    ctx.fillStyle = colorPhase(this.color / 15);
    ctx.fill();
  },

  updatePosition: function() {
    this.up ? this.y = this.y + xbox.axes[1] * this.speed: false;
    this.down ? this.y = this.y + xbox.axes[1] * this.speed : false;
    this.left ? this.x = this.x + xbox.axes[0] * this.speed: false;
    this.right ? this.x = this.x + xbox.axes[0] * this.speed : false;
    if (this.size >= 2) {
      this.A ? this.size++ : false;
      this.B ? this.size-- : false;
    }
    else { this.size = 2; }

    this.X ? this.color = colorPhase(this.color / 15) : false;
  }
};

var player1 = Player;

function renderGame() {
  // ctx.drawImage(space,0,0);
  player1.render();
}


;(function animloop(){
  window.requestAnimationFrame(animloop, 1000 / 60);

  player1.color++;


  for (var i = 0; i < buttons.length; i++) {

    xbox.axes[1] < 0 ? player1.up = true : player1.up = false;
    xbox.axes[1] > 0 ? player1.down = true : player1.down = false;
    xbox.axes[0] > 0 ? player1.right = true : player1.right = false;
    xbox.axes[0] < 0 ? player1.left = true : player1.left = false;

    if (buttons[i].pressed) {
      player1[XBOX_Buttons[i]] = true;
    }

    else {
      player1[XBOX_Buttons[i]] = false;
    }
  }

  renderGame();
})();
