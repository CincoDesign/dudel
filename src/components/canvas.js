/* globals window, document, navigator */

import Brush from './brush';
import Controls from './controls';

class Canvas {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas);
    this.context = this.canvas.getContext('2d');
    this.brush = new Brush(this.canvas, this.context);
    this.controls = new Controls(this.brush);
    this.resizeCanvas = this.resizeCanvas.bind(this);
  }

  resizeCanvas() {
    const { canvas, context } = this;
    const ratio = window.devicePixelRatio;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    context.drawImage(canvas, 0, 0);
  }

  initializeCanvas() {
    const { canvas, brush } = this;
    const { settings } = brush;

    // resize the canvas to fill browser window dynamically
    // setTimeout(() => {
    this.resizeCanvas();
    // }, 2000);

    function doodle(evt) {
      if (settings.clean) settings.clean = false;
      let x;
      let y;
      if (evt.type === 'mousemove' || evt.type === 'mousedown') {
        x = evt.clientX;
        y = evt.clientY;
      }

      if (evt.type === 'touchmove' || evt.type === 'touchstart') {
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
    function initializeMouse(evt) {
      settings.frame = 0;
      doodle(evt);
      canvas.addEventListener('mousemove', doodle, false);
    }

    function initializeTouch(evt) {
      settings.frame = 0;
      doodle(evt);
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
}

export default Canvas;
