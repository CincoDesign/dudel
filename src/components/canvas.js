/* globals window, document, navigator */

import React, { Component } from 'react';
import Brush from './brush';

class Canvas extends Component {
  constructor() {
    super();


    this.resizeCanvas = this.resizeCanvas.bind(this);
  }

  componentDidMount() {
    this.initilizeCanvas();
  }

  resizeCanvas() {
    const { canvas } = this;
    const context = canvas.getContext('2d');

    const tmpCanvas = document.createElement('canvas');
    const tmpContext = tmpCanvas.getContext('2d');

    tmpCanvas.width = window.innerWidth;
    tmpCanvas.height = window.innerHeight;
    tmpContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
    tmpContext.drawImage(canvas, 0, 0);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.drawImage(tmpCanvas, 0, 0);
  }

  initilizeCanvas() {
    const { canvas } = this;
    const context = canvas.getContext('2d');
    // const { xbox } = this.state;
    const brush = new Brush(canvas, context);

    // controls
    const eraser = document.getElementById('eraser');
    const clear = document.getElementById('clear');
    const replay = document.getElementById('replay');
    const loop = document.getElementById('loop');

    // resize the canvas to fill browser window dynamically
    this.resizeCanvas();

    const { settings } = brush;

    function doodle(evt) {
      if (settings.clean) settings.clean = false;
      let x;
      let y;
      if (evt.type === 'mousemove') {
        x = evt.clientX;
        y = evt.clientY;
      }

      if (evt.type === 'touchmove') {
        const touches = evt.targetTouches;
        for (let i = 0; i < touches.length; i += 1) {
          x = touches[i].pageX;
          y = touches[i].pageY;
          settings.size = touches[i].force * 100;
        }
      }

      if (settings.frame === 0) {
        settings.prevX = x;
        settings.prevY = y;
      }

      settings.x = x;
      settings.y = y;
      settings.lx = settings.prevX;
      settings.ly = settings.prevY;
      settings.color += 1;

      if (!settings.xbox) settings.frame += 1;

      // store
      settings.prevX = x;
      settings.prevY = y;
    }

    // Attach the events to the DOM
    function initializeMouse() {
      settings.frame = 0;
      canvas.addEventListener('mousemove', doodle, false);
    }

    function initializeTouch() {
      settings.frame = 0;
      canvas.addEventListener('touchmove', doodle, false);
    }

    window.addEventListener('resize', this.resizeCanvas, false);

    canvas.addEventListener(
      'mouseup',
      () => {
        settings.frame = 0;

        canvas.removeEventListener('mousemove', doodle, false);
      },
      false,
    );

    canvas.addEventListener(
      'touchend',
      () => {
        settings.frame = 0;

        canvas.removeEventListener('touchmove', doodle, false);
      },
      false,
    );

    canvas.addEventListener('touchstart', initializeTouch, false);
    canvas.addEventListener('mousedown', initializeMouse, false);

    eraser.addEventListener('click', () => {
      settings.eraser = !settings.eraser;
      eraser.classList.toggle('active');
    });

    clear.addEventListener('click', () => {
      brush.clear();
      brush.history = [brush.initialHistory];
      settings.eraser = false;
      settings.replay = false;
      settings.loop = false;
      settings.frame = 0;
      settings.clean = true;
      settings.x = -100;
      settings.y = -100;
      settings.lx = -100;
      settings.ly = -100;

      loop.classList.remove('active');
      eraser.classList.remove('active');
    });

    replay.addEventListener('click', () => {
      settings.frame = 0;
      settings.clean = true;
      settings.x = -100;
      settings.y = -100;
      settings.lx = -100;
      settings.ly = -100;
      if (!settings.replay) {
        brush.clear();
        settings.eraser = false;
        settings.replay = true;

        eraser.classList.remove('active');
      }
    });

    loop.addEventListener('click', () => {
      settings.frame = 0;
      settings.clean = true;
      settings.x = -100;
      settings.y = -100;
      settings.lx = -100;
      settings.ly = -100;
      brush.clear();
      if (settings.loop) {
        settings.loop = false;
        settings.replay = false;
        brush.history = [brush.initialHistory];
        replay.disabled = false;
        eraser.disabled = false;
        clear.disabled = false;
      } else {
        settings.loop = true;
        settings.replay = true;
        replay.disabled = true;
        eraser.disabled = true;
        clear.disabled = true;
      }

      loop.classList.toggle('active');
      eraser.classList.remove('active');
    });

    function renderLoop() {
      window.requestAnimationFrame(renderLoop, 1000 / 60);

      const xbox = navigator.getGamepads()[0];

      if (settings.replay) {
        brush.replay();
      } else {
        brush.draw(xbox);
      }
    }

    renderLoop();
  }

  render() {
    return (
      <div>
        <canvas
          ref={(c) => {
          this.canvas = c;
        }}
        />
      </div>
    );
  }
}

export default Canvas;
