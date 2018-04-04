/* globals window, document, navigator */

import React, { Component } from 'react';
import Brush from './brush';
import { buttonList } from './controller';

class Canvas extends Component {
  constructor() {
    super();

    this.state = {
      xbox: null,
    };

    this.resizeCanvas = this.resizeCanvas.bind(this);
  }

  componentWillMount() {
    this.setState({ xbox: navigator.getGamepads()[0] }, () => {
      this.initilizeCanvas();
    });
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
    const { xbox } = this.state;
    const brush = new Brush(canvas, context, xbox);

    // controls
    const eraser = document.getElementById('eraser');
    const clear = document.getElementById('clear');

    // resize the canvas to fill browser window dynamically
    this.resizeCanvas();

    const { settings, controller } = brush;

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
        settings.size = evt.targetTouches[0].force * 100;
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
      settings.frame += 1;

      // store
      settings.prevX = x;
      settings.prevY = y;
    }

    // Attach the events to the DOM
    function initializeMouse() {
      canvas.addEventListener('mousemove', doodle, false);
    }

    function initializeTouch() {
      canvas.addEventListener('touchmove', doodle, false);
    }

    window.addEventListener('resize', this.resizeCanvas, false);

    canvas.addEventListener(
      'mouseup',
      () => {
        settings.frame = 0;
        settings.x = -1000;
        settings.y = -1000;
        settings.lx = -1000;
        settings.ly = -1000;
        canvas.removeEventListener('mousemove', doodle, false);
      },
      false,
    );

    canvas.addEventListener(
      'touchend',
      () => {
        settings.frame = 0;
        settings.x = -1000;
        settings.y = -1000;
        settings.lx = -1000;
        settings.ly = -1000;
        canvas.removeEventListener('touchmove', doodle, false);
      },
      false,
    );

    canvas.addEventListener('touchstart', initializeTouch, false);
    canvas.addEventListener('mousedown', initializeMouse, false);

    eraser.addEventListener('click', () => {
      settings.eraser = !settings.eraser;
      if (settings.eraser) eraser.style = 'background: white; color: black';
      else eraser.style = '';
    });

    clear.addEventListener('click', () => {
      settings.clear = true;
      setTimeout(() => {
        settings.clear = false;
      }, 100);
    });

    function renderLoop() {
      let i;
      window.requestAnimationFrame(renderLoop, 1000 / 60);

      if (!controller.X) {
        if (settings.up || settings.down || settings.left || settings.right) {
          settings.color += 1;
        }
      }

      if (xbox) {
        if (xbox.axes[controller.AxisY] < 0) controller.up = true;
        else settings.up = false;
        if (xbox.axes[controller.AxisY] > 0) controller.down = true;
        else settings.down = false;
        if (xbox.axes[controller.AxisX] > 0) controller.right = true;
        else settings.right = false;
        if (xbox.axes[controller.AxisX] < 0) controller.left = true;
        else settings.left = false;

        for (i = 0; i < xbox.buttons.length; i += 1) {
          if (xbox.buttons[i].pressed) controller[buttonList[i]] = true;
          else controller[buttonList[i]] = false;
        }
      }

      brush.draw();
    }

    renderLoop();
  }

  render() {
    return (
      <canvas
        ref={(c) => {
          this.canvas = c;
        }}
      />
    );
  }
}

export default Canvas;
