/* globals window */

class Brush {
  constructor(canvas, context, xbox) {
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
      frame: 0,
    };

    this.controller = {
      type: xbox,
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

  draw() {
    const BRUSH = this.settings;
    let color = this.colorPhase(BRUSH.color / 30);

    if (BRUSH.eraser) color = 'black';
    if (BRUSH.clear) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.controllerPosition();
    this.context.beginPath();
    this.context.moveTo(BRUSH.lx, BRUSH.ly);
    this.context.lineTo(BRUSH.x, BRUSH.y);
    this.context.lineWidth = BRUSH.size;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  controllerPosition() {
    const BRUSH = this.settings;
    const xbox = this.controller.type;

    if (xbox) {
      if (BRUSH.up) (BRUSH.y += xbox.axes[BRUSH.AxisY] * BRUSH.speed);
      if (BRUSH.down) (BRUSH.y += xbox.axes[BRUSH.AxisY] * BRUSH.speed);
      if (BRUSH.left) (BRUSH.x += xbox.axes[BRUSH.AxisX] * BRUSH.speed);
      if (BRUSH.right) (BRUSH.x += xbox.axes[BRUSH.AxisX] * BRUSH.speed);
      if (BRUSH.LB) {
        BRUSH.speed = 2.5;
      } else if (BRUSH.RB) {
        BRUSH.speed = 10;
      } else {
        BRUSH.speed = 5;
      }
      if (BRUSH.Y) {
        BRUSH.r = 1;
        BRUSH.g = 0;
        BRUSH.b = 5;
      } else {
        BRUSH.r = 2;
        BRUSH.g = 0;
        BRUSH.b = 4;
      }

      if (BRUSH.size >= 20) {
        if (BRUSH.RT) BRUSH.size += 1;
        if (BRUSH.LT) BRUSH.size -= 1;
      } else {
        BRUSH.size = 20;
      }
    }
  }
}

export default Brush;
