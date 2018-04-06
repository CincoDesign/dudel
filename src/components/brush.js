/* globals window */

import { buttonList } from './controller';

class Brush {
  constructor(canvas, context) {
    this.settings = {
      x: -100,
      y: -100,
      r: 2,
      g: 0,
      b: 4,
      height: 5,
      width: 5,
      size: 50,
      color: 0,
      lx: -1000,
      ly: -1000,
      prevX: window.innerWidth / 2,
      prevY: window.innerHeight / 2,
      eraser: false,
      clear: false,
      replay: false,
      loop: false,
      frame: 0,
      stall: 0,
      clean: true,
    };

    this.initialHistory = {
      from: [-1000, -1000],
      to: [-1000, -1000],
      size: this.settings.size,
      color: this.settings.color,
    };

    this.history = [this.initialHistory];

    this.controller = {
      type: null,
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
      AxisX: 0,
      AxisY: 1,
    };

    this.draw = this.draw.bind(this);
    this.controllerPosition = this.controllerPosition.bind(this);
    this.canvas = canvas;
    this.context = context;
  }

  colorPhase(phase) {
    const center = 128;
    const width = 128;
    const frequency = (Math.PI * 2);
    const red = (Math.sin(frequency + this.settings.r + phase) * width) + center;
    const green = (Math.sin(frequency + this.settings.g + phase) * width) + center;
    const blue = (Math.sin(frequency + this.settings.b + phase) * width) + center;

    return `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`;
  }

  line(lx, ly, x, y, size, color) {
    this.context.beginPath();
    this.context.moveTo(lx, ly);
    this.context.lineTo(x, y);
    this.context.lineWidth = size;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  record(data) {
    this.history.push(data);
  }

  draw(xbox) {
    let color = this.colorPhase(this.settings.color / 30);

    if (this.settings.eraser) {
      color = 'rgb(0,0,0)';
    }

    const BRUSH = this.settings;
    const {
      lx, ly, x, y, size,
    } = BRUSH;

    if (BRUSH.clear) {
      this.clear();
    }

    this.line(lx, ly, x, y, size, color);
    this.controllerPosition(xbox);

    const data = {
      from: [lx, ly],
      to: [x, y],
      size,
      color,
    };

    if (BRUSH.frame !== 0) {
      if (!BRUSH.replay) {
        this.record(data);
      }
    }
  }

  replay() {
    const loop = this.history.length - 1;
    const stall = 60;
    const history = this.history[this.settings.frame];

    const lx = history.from[0];
    const ly = history.from[1];
    const x = history.to[0];
    const y = history.to[1];
    const { size, color } = history;

    if (this.settings.frame < loop) {
      this.settings.frame += 1;
      this.line(lx, ly, x, y, size, color);
    } else if (!this.settings.loop) {
      this.settings.frame = 0;
      this.settings.replay = false;
    } else {
      this.settings.stall += 1;
      if (this.settings.stall >= stall) {
        this.settings.stall = 0;
        this.settings.frame = 0;
        this.clear();
      }
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  controllerPosition(xbox) {
    const CTRL = this.controller;
    const BRUSH = this.settings;

    function update() {
      BRUSH.xbox = true;
      BRUSH.color += 1;
      BRUSH.frame += 1;
    }

    if (xbox && !BRUSH.clean) {
      if (
        xbox.axes[CTRL.AxisY] < 0 ||
        xbox.axes[CTRL.AxisY] > 0 ||
        xbox.axes[CTRL.AxisX] > 0 ||
        xbox.axes[CTRL.AxisX] < 0) {
        update();
      }

      if (xbox.axes[CTRL.AxisY] === 0 && xbox.axes[CTRL.AxisX] === 0 && BRUSH.xbox) {
        BRUSH.frame = 0;
        BRUSH.xbox = false;
      }

      for (let i = 0; i < xbox.buttons.length; i += 1) {
        if (xbox.buttons[i].pressed) CTRL[buttonList[i]] = true;
        else CTRL[buttonList[i]] = false;
      }

      BRUSH.y += xbox.axes[CTRL.AxisY] * CTRL.speed;
      BRUSH.y += xbox.axes[CTRL.AxisY] * CTRL.speed;
      BRUSH.x += xbox.axes[CTRL.AxisX] * CTRL.speed;
      BRUSH.x += xbox.axes[CTRL.AxisX] * CTRL.speed;

      if (!CTRL.B) {
        BRUSH.ly = BRUSH.prevY;
        BRUSH.ly = BRUSH.prevY;
        BRUSH.lx = BRUSH.prevX;
        BRUSH.lx = BRUSH.prevX;
      }

      BRUSH.prevY += xbox.axes[CTRL.AxisY] * CTRL.speed;
      BRUSH.prevY += xbox.axes[CTRL.AxisY] * CTRL.speed;
      BRUSH.prevX += xbox.axes[CTRL.AxisX] * CTRL.speed;
      BRUSH.prevX += xbox.axes[CTRL.AxisX] * CTRL.speed;

      if (CTRL.LB) {
        CTRL.speed = 2.5;
      } else if (CTRL.RB) {
        CTRL.speed = 10;
      } else {
        CTRL.speed = 5;
      }
      if (CTRL.Y) {
        BRUSH.r = 1;
        BRUSH.g = 0;
        BRUSH.b = 5;
      } else {
        BRUSH.r = 2;
        BRUSH.g = 0;
        BRUSH.b = 4;
      }

      if (BRUSH.size >= 20) {
        if (CTRL.RT) BRUSH.size += 1;
        if (CTRL.LT) BRUSH.size -= 1;
      } else {
        BRUSH.size = 20;
      }
    }
  }
}

export default Brush;
