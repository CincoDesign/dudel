import React from 'react';

class Canvas extends React.Component {

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    let xbox = undefined;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const buttonList = [
      'A',
      'B',
      'X',
      'Y',
      'LB',
      'RB',
      'LT',
      'RT',
      'SEL',
      'STR',
      'L3',
      'R3',
      'up',
      'down',
      'left',
      'right',
      'sync',
    ];

    window.addEventListener('gamepadconnected', () => {
      xbox = navigator.getGamepads()[0];
    });

    document.body.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });

    // resize the canvas to fill browser window dynamically
    function resizeCanvas() {
      let originalBackgroundColor;
      const tempCnvs = document.createElement('canvas');
      const tempCntx = tempCnvs.getContext('2d');

      tempCnvs.width = window.innerWidth;
      tempCnvs.height = window.innerHeight;
      tempCntx.fillStyle = originalBackgroundColor;
      tempCntx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      tempCntx.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(tempCnvs, 0, 0);
    }

    window.addEventListener('resize', resizeCanvas, false);

    resizeCanvas();

    // Mouse shit
    // function getMousePos(canvas, evt) {
    //   const rect = canvas.getBoundingClientRect();
    //   return {
    //     x: evt.clientX - rect.left,
    //     y: evt.clientY - rect.top,
    //   };
    // }

    function colorPhase(phase, x, y, z) {
      let color;
      let red;
      let green;
      let blue;

      if (phase === undefined) {
        phase = 0;
      }

      const center = 128;
      const width = 127;
      const frequency = Math.PI * 2 / 10;

      for (let i = 0; i < 100; ++i) {
        red = Math.sin(frequency * i + x + phase) * width + center;
        green = Math.sin(frequency * i + y + phase) * width + center;
        blue = Math.sin(frequency * i + z + phase) * width + center;

        color = `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`;
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
        A: false,
        B: false,
        X: false,
        Y: false,
        RT: false,
        LT: false,
        RB: false,
        LB: false,
        up: false,
        down: false,
        left: false,
        right: false,
        speed: 5,
        color: 0,
        AxisX: 0,
        AxisY: 1,

        render: () => {
          const THAT = this.settings;
          THAT.updatePosition();
          // ctx.rect(THAT.x, THAT.y, THAT.size, THAT.size);
          ctx.beginPath();
          ctx.arc(THAT.x, THAT.y, THAT.size, 0, 2 * Math.PI);
          ctx.fillStyle = colorPhase(THAT.color / 15, THAT.r, THAT.g, THAT.b);
          ctx.fill();
        },

        updatePosition: () => {
          const THAT = this.settings;
          if (xbox !== undefined) {
            THAT.up
              ? THAT.y = THAT.y + xbox.axes[THAT.AxisY] * THAT.speed
              : false;
            THAT.down
              ? THAT.y = THAT.y + xbox.axes[THAT.AxisY] * THAT.speed
              : false;
            THAT.left
              ? THAT.x = THAT.x + xbox.axes[THAT.AxisX] * THAT.speed
              : false;
            THAT.right
              ? THAT.x = THAT.x + xbox.axes[THAT.AxisX] * THAT.speed
              : false;
          }

          if (THAT.LB) {
            THAT.speed = 2.5;
          } else if (THAT.RB) {
            THAT.speed = 10;
          } else {
            THAT.speed = 5;
          }

          if (THAT.Y) {
            THAT.r = 1;
            THAT.g = 0;
            THAT.b = 5;
          } else {
            THAT.r = 2;
            THAT.g = 0;
            THAT.b = 4;
          }

          if (THAT.size >= 20) {
            THAT.RT
              ? THAT.size++
              : false;
            THAT.LT
              ? THAT.size--
              : false;
          } else {
            THAT.size = 20;
          }
        },
      };
    }

    const player1 = new Player({});
    // const player2 = new Player({});

    const p1 = player1.settings;
    // const p2 = player2.settings;
    // const players = [p1];

    function initializeTouch() {
      canvas.addEventListener('touchmove', (evt) => {
        // const mousePos = getMousePos(canvas, evt);
        // const message = `Mouse position: ${mousePos.x}, ${mousePos.y}`;
        const force = evt.targetTouches[0].force;

        p1.x = evt.targetTouches[0].pageX;
        p1.y = evt.targetTouches[0].pageY;
        p1.color++;
        p1.size = force * 100;
      }, false);
    }

    window.addEventListener('load', initializeTouch, false);

    function animLoop() {
      let i;
      window.requestAnimationFrame(animLoop, 1000 / 60);

      if (!p1.X) {
        if (p1.up || p1.down || p1.left || p1.right) {
          p1.color++;
        }
      }

      // if (!p2.X) {
      //   if (p2.up || p2.down || p2.left || p2.right) {
      //     p2.color++;
      //   }
      // }

      if (xbox !== undefined) {
        for (i = 0; i < xbox.buttons.length; i++) {
          xbox.axes[p1.AxisY] < 0
            ? p1.up = true
            : p1.up = false;
          xbox.axes[p1.AxisY] > 0
            ? p1.down = true
            : p1.down = false;
          xbox.axes[p1.AxisX] > 0
            ? p1.right = true
            : p1.right = false;
          xbox.axes[p1.AxisX] < 0
            ? p1.left = true
            : p1.left = false;

          // xbox.axes[p2.AxisY] < 0 ? p2.up = true : p2.up = false;
          // xbox.axes[p2.AxisY] > 0 ? p2.down = true : p2.down = false;
          // xbox.axes[p2.AxisX] > 0 ? p2.right = true : p2.right = false;
          // xbox.axes[p2.AxisX] < 0 ? p2.left = true : p2.left = false;

          xbox.buttons[i].pressed
            ? p1[buttonList[i]] = true
            : p1[buttonList[i]] = false;
          // xbox.buttons[i].pressed ? p2[buttonList[i]] = true : p2[buttonList[i]] = false;
        }
      }

      // players.forEach((player) => {
      //   player.render();
      // });

      p1.render();
    }

    animLoop();
  }

  render() {
    return (<canvas ref="canvas" />);
  }
}

module.exports = Canvas;
