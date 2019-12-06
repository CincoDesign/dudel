/* globals document, window, navigator */

const width = window.innerWidth
const height = window.innerHeight

class Controls {
  constructor(brush) {
    this.gifOff = false

    this.eraserBtn = document.getElementById('eraser')
    this.clearBtn = document.getElementById('clear')
    this.replayBtn = document.getElementById('replay')
    this.loopBtn = document.getElementById('loop')
    this.blissBtn = document.getElementById('bliss')
    this.videoBtn = document.getElementById('videoBtn')

    this.videoScrn = document.getElementById('video')

    this.sizer = document.getElementById('sizer')
    this.color = document.getElementById('color')

    this.snapChat = document.getElementById('basicallySnapchat')
    this.snapChatBtn = document.getElementById('snapBtn')
    this.snapBlock = document.getElementById('snapBlock')
    this.snapOffBtn = document.getElementById('snapOff')

    this.gifBro = document.getElementById('gifBro')
    this.gifCanvas = document.getElementById('gifCanvas')

    this.eraserBtn.addEventListener('click', () => this.eraser())
    this.clearBtn.addEventListener('click', () => this.clear())
    this.replayBtn.addEventListener('click', () => this.replay())
    this.loopBtn.addEventListener('click', () => this.loop())
    this.blissBtn.addEventListener('click', () => this.bliss())
    this.videoBtn.addEventListener('click', () => this.video())
    this.snapChatBtn.addEventListener('click', () => this.snap())
    this.snapOffBtn.addEventListener('click', () => this.snapOff())

    this.gifBro.addEventListener('click', () => this.gifToggle())

    this.sizer.addEventListener('change', event => this.sizeSlider(event))
    this.color.addEventListener('change', event => this.updateBrush(event))

    this.eraser = this.eraser.bind(this)
    this.clear = this.clear.bind(this)
    this.replay = this.replay.bind(this)
    this.loop = this.loop.bind(this)

    this.brush = brush
    this.settings = this.brush.settings

    this.videoScrn.width = this.snapChat.width = this.gifCanvas.width = width
    this.videoScrn.height = this.snapChat.height = this.gifCanvas.height = height

    this.sizeCounter = this.settings.size

    this.gogogo = null
    this.gifArray = []

    // PP Demo Tweaks
    this.blissBtn.style.visibility = 'hidden'
    this.sizer.style.visibility = 'hidden'
    this.videoBtn.style.visibility = 'hidden'
    this.gifBro.style.visibility = 'hidden'
    this.snapBlock.visibility = 'hidden'

    this.video()
  }

  updateBrush(event) {
    this.brush.settings.color = event.target.value
  }

  video() {
    if (this.videoBtn.classList.contains('active')) {
      this.videoBtn.classList.remove('active')
      this.snapBlock.style = 'display: none'
      this.videoScrn.style = 'display: none'
      this.snapChat.style = 'display: none'
      return false
    }

    navigator.mediaDevices.getUserMedia({
      video: true,
    })
      .then(stream => {
        this.videoScrn.srcObject = stream
        this.videoScrn.setAttribute('autoplay', true)
        this.videoScrn.style = 'display: block'
        this.snapBlock.style = 'display: block'
      })
      .catch(err => {
        window.alert(err)
      })

    this.videoBtn.classList.add('active')
  }

  snap() {
    const that = this
    const video = that.videoScrn
    const canvas = that.snapChat

    function calculateSize(srcSize, dstSize) {
      const srcRatio = srcSize.width / srcSize.height
      const dstRatio = dstSize.width / dstSize.height
      if (dstRatio > srcRatio) {
        return {
          width: dstSize.height * srcRatio,
          height: dstSize.height,
        }
      }
      return {
        width: dstSize.width,
        height: dstSize.width / srcRatio,
      }
    }

    const videoSize = {
      width: video.videoWidth,
      height: video.videoHeight,
    }
    const canvasSize = {
      width: canvas.width,
      height: canvas.height,
    }
    const renderSize = calculateSize(videoSize, canvasSize)
    const xOffset = (canvasSize.width - renderSize.width) / 2
    const yOffset = (canvasSize.height - renderSize.height) / 2

    let len = this.gifArray.length
    let timer = 30
    let downdown

    function snapIt() {
      canvas.style = 'display: block'
      canvas.getContext('2d').drawImage(video, xOffset, yOffset, renderSize.width, renderSize.height)
    }

    function gifIt() {
      canvas.getContext('2d').drawImage(video, xOffset, yOffset, renderSize.width, renderSize.height)
      const frame = canvas.getContext('2d').getImageData(xOffset, yOffset, renderSize.width, renderSize.height)
      that.gifArray.push(frame)
    }


    function loopsBoi() {
      if (len >= that.gifArray.length - 1) {
        len = 0
      } else len += 1

      that.gifCanvas.getContext('2d').putImageData(that.gifArray[len], xOffset, yOffset)
    }

    function stopCountdown() {
      clearInterval(downdown)
      that.gogogo = setInterval(loopsBoi, 60)
    }

    function countingDown() {
      timer -= 1
      that.snapChatBtn.innerHTML = timer
      gifIt()

      if (timer === 0) {
        that.snapChatBtn.innerHTML = 'Snap!'
        that.snapChatBtn.classList.add('active')
        that.snapChatBtn.classList.remove('woooooooo')
        snapIt()
        stopCountdown()
        that.gifBro.disabled = false
        that.snapOffBtn.disabled = false
        that.gifBro.classList.add('baked')
      }
    }

    const somebodyClickedTheSnapButon = () => {
      this.snapChatBtn.classList.add('ehhhh')
      this.snapChatBtn.innerHTML = 'Ready?'

      this.snapChatBtn.classList.remove('active')
      this.gifBro.disabled = true
      this.snapOffBtn.disabled = true
      this.gifBro.classList.remove('active')

      this.gifCanvas.style = 'display: none'
      this.gifArray = []
      clearInterval(this.gogogo)
      setTimeout(() => {
        downdown = setInterval(countingDown, 100)
        this.snapChatBtn.classList.add('woooooooo')
        this.snapChatBtn.classList.remove('ehhhh')
      }, 1500)
    }


    if (this.videoBtn.classList.contains('active')) {
      this.snapOff()
      somebodyClickedTheSnapButon()
    }

    this.gifToggle()
  }

  snapOff() {
    this.gifCanvas.style = 'display: none'
    this.snapChat.style = 'display: none'
    this.snapChatBtn.classList.remove('active')
    this.gifBro.classList.remove('active')
  }

  gifToggle() {
    if (this.gifBro.classList.contains('active')) {
      this.gifCanvas.style = 'display: none'
      this.gifBro.classList.remove('active')
    } else {
      this.gifCanvas.style = 'display: block'
      this.gifBro.classList.add('active')
    }
  }

  clear() {
    const {
      brush,
      loopBtn,
      eraserBtn,
    } = this
    brush.clear()
    brush.history = [brush.initialHistory]
    brush.reset()

    loopBtn.classList.remove('active')
    eraserBtn.classList.remove('active')
  }

  eraser() {
    const {
      settings,
      eraserBtn,
    } = this
    settings.eraser = !settings.eraser
    settings.x = -100
    settings.y = -100
    settings.lx = -100
    settings.ly = -100
    eraserBtn.classList.toggle('active')
  }

  replay() {
    const {
      brush,
      settings,
      eraserBtn,
    } = this
    settings.frame = 0
    settings.x = -100
    settings.y = -100
    settings.lx = -100
    settings.ly = -100

    if (!settings.replay) {
      brush.clear()
      settings.eraser = false
      settings.replay = true

      eraserBtn.classList.remove('active')
    }
  }

  loop() {
    const {
      brush,
      settings,
      replayBtn,
      loopBtn,
      eraserBtn,
      clearBtn,
    } = this
    settings.frame = 0
    settings.clean = true
    settings.x = -100
    settings.y = -100
    settings.lx = -100
    settings.ly = -100
    brush.clear()

    if (settings.loop) {
      settings.loop = false
      settings.replay = false
      brush.history = [brush.initialHistory]
      brush.reset()
      replayBtn.disabled = false
      eraserBtn.disabled = false
      clearBtn.disabled = false
    } else {
      settings.loop = true
      settings.replay = true
      replayBtn.disabled = true
      eraserBtn.disabled = true
      clearBtn.disabled = true
    }

    loopBtn.classList.toggle('active')
    eraserBtn.classList.remove('active')
  }

  bliss() {
    document.body.classList.toggle('bliss')
    this.blissBtn.classList.toggle('active')
  }

  sizeUp() {
    this.brush.reset()
    this.settings.size += 2
    this.sizeCounter = this.settings.size
    document.getElementById('size').innerHTML = this.settings.size
  }

  sizeDown() {
    this.brush.reset()
    this.settings.size -= 2
    this.sizeCounter = this.settings.size
    document.getElementById('size').innerHTML = this.settings.size
  }

  sizeSlider(event) {
    this.brush.reset()
    this.settings.size = event.target.value
    document.getElementById('size').innerHTML = this.settings.size
  }
}

export default Controls
