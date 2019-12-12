/* globals window, document */

import Brush from './brush'
import Controls from './controls'
import { Sticker, stamp } from './sticker'

class Canvas {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas)
    this.context = this.canvas.getContext('2d')
    this.brush = new Brush(this.canvas, this.context)
    this.controls = new Controls(this.brush)
    this.resizeCanvas = this.resizeCanvas.bind(this)
  }

  resizeCanvas() {
    const { canvas, context } = this
    const ratio = window.devicePixelRatio
    canvas.width = window.innerWidth * ratio
    canvas.height = window.innerHeight * ratio
    canvas.style.width = window.innerWidth
    canvas.style.height = window.innerHeight
    context.drawImage(canvas, 0, 0)
  }

  async initializeCanvas() {
    const { canvas, brush } = this
    const { settings } = brush

    this.sticker = await Sticker.load('hbd.gif')

    // const s = stamp(this.sticker, this.context)

    const req = new XMLHttpRequest()
    req.open('GET', '/hbd.gif')
    req.responseType = 'arraybuffer'

    req.onload = () => {
      const arraybuffer = req.response
      console.log(arraybuffer)
    }

    req.send()

    // resize the canvas to fill browser window dynamically
    this.resizeCanvas()

    function doodle(evt) {
      if (settings.clean) settings.clean = false
      let x
      let y
      if (evt.type === 'mousemove' || evt.type === 'mousedown') {
        x = evt.clientX
        y = evt.clientY
      }

      if (evt.type === 'touchmove' || evt.type === 'touchstart') {
        const touches = evt.targetTouches

        x = touches[0].clientX
        y = touches[0].clientY
        // settings.size = touches[0].force * 100;
      }


      if (settings.frame === 0) {
        settings.lx = x
        settings.ly = y
      }


      settings.x = x
      settings.y = y

      // settings.color += 1
      settings.frame += 1
    }

    // Attach the events to the DOM
    function initializeMouse(evt) {
      settings.frame = 0
      doodle(evt)
      canvas.addEventListener('mousemove', doodle)
    }

    function initializeTouch(evt) {
      settings.frame = 0
      doodle(evt)
      canvas.addEventListener('touchmove', doodle)
    }

    window.addEventListener('resize', this.resizeCanvas, false)

    canvas.addEventListener(
      'mouseup',
      () => {
        settings.frame = 0

        canvas.removeEventListener('mousemove', doodle)
      },
      false
    )

    canvas.addEventListener(
      'touchend',
      () => {
        settings.frame = 0

        canvas.removeEventListener('touchmove', doodle)
      },
      false
    )

    canvas.addEventListener('touchstart', initializeTouch, false)
    canvas.addEventListener('mousedown', initializeMouse, false)

    function renderLoop() {

      if (settings.replay) {
        brush.replay()
      } else {
        brush.draw()
      }

      // s.draw()


      window.requestAnimationFrame(renderLoop)
    }

    renderLoop()
  }
}

export default Canvas
