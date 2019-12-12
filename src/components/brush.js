const initialState = {
  x: -100,
  y: -100,
  lx: -100,
  ly: -100,
  frame: 0,
  stall: 0,
  r: 2,
  g: 0,
  b: 4,
  speed: 5,
  height: 5,
  width: 127,
  size: 16,
  color: '#0033CC',
  eraser: false,
  replay: false,
  loop: false,
  clean: true,
  gradient: '',
}

class Brush {
  constructor(canvas, context) {
    this.settings = initialState

    this.initialHistory = {
      from: [-1000, -1000],
      to: [-1000, -1000],
      size: this.settings.size,
      color: this.settings.color,
    }

    this.history = [this.initialHistory]

    this.draw = this.draw.bind(this)
    // this.controllerPosition = this.controllerPosition.bind(this)
    this.canvas = canvas
    this.context = context
  }

  colorPhase(phase) {
    const center = 128
    const { width } = this.settings
    const frequency = (Math.PI * 2)
    const steps = this.settings.height
    const red = (Math.sin((frequency / steps) + this.settings.r + phase) * width) + center
    const green = (Math.sin((frequency / steps) + this.settings.g + phase) * width) + center
    const blue = (Math.sin((frequency / steps) + this.settings.b + phase) * width) + center

    return `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`
  }

  line(x, y, size, color) {
    const { context } = this
    context.beginPath()
    context.moveTo(this.settings.lx, this.settings.ly)
    context.lineTo(x, y)
    context.lineWidth = size
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = color
    context.stroke()
    context.closePath()

    this.settings.lx = x
    this.settings.ly = y
  }

  record(data) {
    this.history.push(data)
  }

  draw() {
    const {
      lx, ly, x, y, size, eraser, frame, replay,
    } = this.settings

    // let color = this.colorPhase(this.settings.color / 30)
    let { color } = this.settings

    if (frame === 0) {
      color = null
    }

    if (eraser) {
      color = 'rgb(0,0,0)'
    }

    this.line(x, y, size, color)

    const data = {
      from: [lx, ly],
      to: [x, y],
      size,
      color,
    }

    if (frame !== 0) {
      if (!replay) {
        this.record(data)
      }
    }
  }

  replay() {
    const loop = this.history.length - 1
    const stall = 60
    const history = this.history[this.settings.frame]

    const lx = history.from[0]
    const ly = history.from[1]
    const x = history.to[0]
    const y = history.to[1]
    const { size, color } = history

    if (this.settings.frame < loop) {
      this.settings.frame += 1
      this.line(lx, ly, x, y, size, color)
    } else if (!this.settings.loop) {
      this.settings.frame = 0
      this.settings.replay = false
    } else {
      this.settings.stall += 1
      if (this.settings.stall >= stall) {
        this.settings.stall = 0
        this.settings.frame = 0
        this.clear()
      }
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  reset() {
    this.settings.x = -100
    this.settings.y = -100
    this.settings.lx = -100
    this.settings.ly = -100
    this.settings.prevX = -100
    this.settings.prevY = -100
    this.settings.frame = 0
    this.settings.stall = 0
    this.settings.speed = 5
    this.settings.height = 5
    this.settings.width = 127
    this.settings.size = 16
    this.settings.eraser = false
    this.settings.replay = false
    this.settings.loop = false
    this.settings.clean = true
  }
}

export default Brush
