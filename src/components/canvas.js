/* globals window, document, navigator */
// TODO: lint, refactor

import React, { Component } from 'react';

class Canvas extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    let xbox;
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

    // resize the canvas to fill browser window dynamically
    function resizeCanvas() {
      const tempCnvs = document.createElement('canvas');
      const tempCntx = tempCnvs.getContext('2d');

      tempCnvs.width = window.innerWidth;
      tempCnvs.height = window.innerHeight;
      tempCntx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      tempCntx.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(tempCnvs, 0, 0);
    }

    window.addEventListener('resize', resizeCanvas, false);

    resizeCanvas();

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

    function Brush() {
      this.settings = {
        x: -100,
        y: -100,
        r: 2,
        g: 0,
        b: 4,
        height: 5,
        width: 5,
        size: 50,
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
        lx: -1000,
        ly: -1000,
        prevX: window.innerWidth / 2,
        prevY: window.innerHeight / 2,
        eraser: false,
        clear: false,
        frame: 0,

        render: () => {
          const _BRUSH_ = this.settings;
          let color = colorPhase(_BRUSH_.color / 20, _BRUSH_.r, _BRUSH_.g, _BRUSH_.b);

          _BRUSH_.updatePosition();

          if (_BRUSH_.eraser) color = 'black';

          ctx.beginPath();
          ctx.moveTo(_BRUSH_.lx, _BRUSH_.ly);
          ctx.lineTo(_BRUSH_.x, _BRUSH_.y);
          ctx.lineWidth = _BRUSH_.size;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = color;
          ctx.stroke();

          if (_BRUSH_.clear) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        },

        updatePosition: () => {
          const _BRUSH_ = this.settings;
          if (xbox !== undefined) {
            _BRUSH_.up
              ? _BRUSH_.y += xbox.axes[_BRUSH_.AxisY] * _BRUSH_.speed
              : false;
            _BRUSH_.down
              ? _BRUSH_.y += xbox.axes[_BRUSH_.AxisY] * _BRUSH_.speed
              : false;
            _BRUSH_.left
              ? _BRUSH_.x += xbox.axes[_BRUSH_.AxisX] * _BRUSH_.speed
              : false;
            _BRUSH_.right
              ? _BRUSH_.x += xbox.axes[_BRUSH_.AxisX] * _BRUSH_.speed
              : false;
          }

          if (_BRUSH_.LB) {
            _BRUSH_.speed = 2.5;
          } else if (_BRUSH_.RB) {
            _BRUSH_.speed = 10;
          } else {
            _BRUSH_.speed = 5;
          }

          if (_BRUSH_.Y) {
            _BRUSH_.r = 1;
            _BRUSH_.g = 0;
            _BRUSH_.b = 5;
          } else {
            _BRUSH_.r = 2;
            _BRUSH_.g = 0;
            _BRUSH_.b = 4;
          }

          if (_BRUSH_.size >= 20) {
            _BRUSH_.RT
              ? _BRUSH_.size++
              : false;
            _BRUSH_.LT
              ? _BRUSH_.size--
              : false;
          } else {
            _BRUSH_.size = 20;
          }
        },
      };
    }

    const brush = new Brush({});

    const br = brush.settings;

    function doodle(evt) {
      let x;
      let y;
      if (evt.type === 'mousemove') {
        x = evt.clientX;
        y = evt.clientY;
      }

      if (evt.type === 'touchmove') {
        x = evt.targetTouches[0].pageX;
        y = evt.targetTouches[0].pageY;
        br.size = evt.targetTouches[0].force * 100;
      }

      if (br.frame === 0) {
        br.prevX = x;
        br.prevY = y;
      }

      br.x = x;
      br.y = y;
      br.lx = br.prevX;
      br.ly = br.prevY;
      br.color += 1;
      br.frame += 1;

      // store
      br.prevX = x;
      br.prevY = y;
    }

    function initializeMouse() {
      canvas.addEventListener('mousemove', doodle, false);
    }

    function initializeTouch() {
      canvas.addEventListener('touchmove', doodle, false);
    }

    canvas.addEventListener('mouseup', () => {
      br.frame = 0;
      br.x = -1000; br.y = -1000;
      br.lx = -1000; br.ly = -1000;
      canvas.removeEventListener('mousemove', doodle, false);
    }, false);

    canvas.addEventListener('touchend', () => {
      br.frame = 0;
      br.x = -1000; br.y = -1000;
      br.lx = -1000; br.ly = -1000;
      canvas.removeEventListener('touchmove', doodle, false);
    }, false);

    canvas.addEventListener('touchstart', initializeTouch, false);
    canvas.addEventListener('mousedown', initializeMouse, false);

    const eraser = document.getElementById('eraser');
    const clear = document.getElementById('clear');

    eraser.addEventListener('click', () => {
      br.eraser = !br.eraser;
      if (br.eraser) eraser.style = 'background: white; color: black';
      else eraser.style = '';
    });

    clear.addEventListener('click', () => {
      br.clear = true;
      setTimeout(() => { br.clear = false; }, 100);
    });

    function renderLoop() {
      let i;
      window.requestAnimationFrame(renderLoop, 1000 / 60);

      if (!br.X) {
        if (br.up || br.down || br.left || br.right) {
          br.color++;
        }
      }

      if (xbox !== undefined) {
        for (i = 0; i < xbox.buttons.length; i++) {
          xbox.axes[br.AxisY] < 0
            ? br.up = true
            : br.up = false;
          xbox.axes[br.AxisY] > 0
            ? br.down = true
            : br.down = false;
          xbox.axes[br.AxisX] > 0
            ? br.right = true
            : br.right = false;
          xbox.axes[br.AxisX] < 0
            ? br.left = true
            : br.left = false;

          xbox.buttons[i].pressed
            ? br[buttonList[i]] = true
            : br[buttonList[i]] = false;
        }
      }

      br.render();
    }

    renderLoop();
  }

  render() {
    return <canvas ref="canvas" />;
  }
}

module.exports = Canvas;
