import { buttonList } from './controller';

const initialState = {
  x: -100,
  y: -100,
  lx: -100,
  ly: -100,
  prevX: -100,
  prevY: -100,
  frame: 0,
  stall: 0,
  r: 2,
  g: 0,
  b: 4,
  speed: 5,
  height: 5,
  width: 127,
  size: 50,
  color: 0,
  eraser: false,
  replay: false,
  loop: false,
  clean: true,
  gradient: '',
};

class Brush {
  constructor(canvas, context) {
    this.settings = initialState;

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
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
      AXIS_X: 0,
      AXIS_Y: 1,
    };

    this.draw = this.draw.bind(this);
    this.controllerPosition = this.controllerPosition.bind(this);
    this.canvas = canvas;
    this.context = context;
  }

  colorPhase(phase) {
    const center = 128;
    const { width } = this.settings;
    const frequency = (Math.PI * 2);
    const steps = this.settings.height;
    const red = (Math.sin((frequency / steps) + this.settings.r + phase) * width) + center;
    const green = (Math.sin((frequency / steps) + this.settings.g + phase) * width) + center;
    const blue = (Math.sin((frequency / steps) + this.settings.b + phase) * width) + center;

    return `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`;
  }

  line(lx, ly, x, y, size, color) {
    const { context } = this;
    context.beginPath();
    context.moveTo(lx, ly);
    context.lineTo(x, y);
    context.lineWidth = size;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.stroke();
  }

  record(data) {
    this.history.push(data);
  }

  draw(xbox) {
    const {
      lx, ly, x, y, size, eraser, frame, replay,
    } = this.settings;

    let color = this.colorPhase(this.settings.color / 30);

    if (eraser) {
      color = 'rgb(0,0,0)';
    }

    this.line(lx, ly, x, y, size, color);
    this.controllerPosition(xbox);

    const data = {
      from: [lx, ly],
      to: [x, y],
      size,
      color,
    };

    if (frame !== 0) {
      if (!replay) {
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

  reset() {
    this.settings.x = -100;
    this.settings.y = -100;
    this.settings.lx = -100;
    this.settings.ly = -100;
    this.settings.prevX = -100;
    this.settings.prevY = -100;
    this.settings.frame = 0;
    this.settings.stall = 0;
    this.settings.speed = 5;
    this.settings.height = 5;
    this.settings.width = 127;
    // this.settings.size = 50;
    this.settings.eraser = false;
    this.settings.replay = false;
    this.settings.loop = false;
    this.settings.clean = true;
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
        xbox.axes[CTRL.AXIS_Y] < 0 ||
        xbox.axes[CTRL.AXIS_Y] > 0 ||
        xbox.axes[CTRL.AXIS_X] > 0 ||
        xbox.axes[CTRL.AXIS_X] < 0) {
        update();
      }

      if (xbox.axes[CTRL.AXIS_Y] === 0 && xbox.axes[CTRL.AXIS_X] === 0 && BRUSH.xbox) {
        BRUSH.frame = 0;
        BRUSH.xbox = false;
      }

      for (let i = 0; i < xbox.buttons.length; i += 1) {
        if (xbox.buttons[i].pressed) CTRL[buttonList[i]] = true;
        else CTRL[buttonList[i]] = false;
      }

      BRUSH.y += xbox.axes[CTRL.AXIS_Y] * CTRL.speed;
      BRUSH.x += xbox.axes[CTRL.AXIS_X] * CTRL.speed;

      if (!CTRL.B) {
        BRUSH.ly = BRUSH.prevY;
        BRUSH.lx = BRUSH.prevX;
      }

      BRUSH.prevY += xbox.axes[CTRL.AXIS_Y] * CTRL.speed;
      BRUSH.prevX += xbox.axes[CTRL.AXIS_X] * CTRL.speed;

      if (CTRL.LB) {
        BRUSH.speed = 2.5;
      } else if (CTRL.RB) {
        BRUSH.speed = 10;
      } else {
        BRUSH.speed = 5;
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
