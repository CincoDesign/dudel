/* globals document */


const width = window.innerWidth;
const height = window.innerHeight;


class Controls {
  constructor(brush) {
    this.gifOff = false;

    this.eraserBtn = document.getElementById('eraser');
    this.clearBtn = document.getElementById('clear');
    this.replayBtn = document.getElementById('replay');
    this.loopBtn = document.getElementById('loop');
    this.blissBtn = document.getElementById('bliss');
    this.videoBtn = document.getElementById('videoBtn');

    this.videoScrn = document.getElementById('video');

    // this.sizeUpBtn = document.getElementById('sizeUp');
    // this.sizeDownBtn = document.getElementById('sizeDown');
    this.sizer = document.getElementById('sizer');

    this.snapChat = document.getElementById('basicallySnapchat');
    this.snapChatBtn = document.getElementById('snapBtn');
    this.snapBlock = document.getElementById('snapBlock');
    this.snapOffBtn = document.getElementById('snapOff');


    this.gifBro = document.getElementById('gifBro');
    this.gifCanvas = document.getElementById('gifCanvas');


    // this.rInput = document.getElementById('red');
    // this.gInput = document.getElementById('green');
    // this.bInput = document.getElementById('blue');
    // this.freq = document.getElementById('freq');
    // this.step = document.getElementById('step');

    this.eraserBtn.addEventListener('click', () => this.eraser());
    this.clearBtn.addEventListener('click', () => this.clear());
    this.replayBtn.addEventListener('click', () => this.replay());
    this.loopBtn.addEventListener('click', () => this.loop());
    this.blissBtn.addEventListener('click', () => this.bliss());
    this.videoBtn.addEventListener('click', () => this.video());
    this.snapChatBtn.addEventListener('click', () => this.snap());
    this.snapOffBtn.addEventListener('click', () => this.snapOff());

    this.gifBro.addEventListener('click', () => this.giffy());
    // this.sizeUpBtn.addEventListener('click', () => this.sizeUp());
    // this.sizeDownBtn.addEventListener('click', () => this.sizeDown());
    this.sizer.addEventListener('change', event => this.sizeSlider(event));

    // this.rInput.addEventListener('change', e => this.upVal('r', e.target));
    // this.gInput.addEventListener('change', e => this.upVal('g', e.target));
    // this.bInput.addEventListener('change', e => this.upVal('b', e.target));
    // this.freq.addEventListener('change', e => this.upVal('width', e.target));
    // this.step.addEventListener('change', e => this.upVal('height', e.target));

    this.eraser = this.eraser.bind(this);
    this.clear = this.clear.bind(this);
    this.replay = this.replay.bind(this);
    this.loop = this.loop.bind(this);

    this.brush = brush;
    this.settings = this.brush.settings;

    this.videoScrn.width = this.snapChat.width = this.gifCanvas.width = width;
    this.videoScrn.height = this.snapChat.height = this.gifCanvas.height = height;

    this.sizeCounter = this.settings.size;

    this.gogogo = null;
    this.gifArray = [];
  }

  // upVal(color, target) {
  //   this.settings[color] = parseInt(target.value, 10);
  // }

  video() {
    if (this.videoBtn.classList.contains('active')) {
      this.videoBtn.classList.remove('active');
      this.snapBlock.style = 'display: none';
      this.videoScrn.style = 'display: none';
      this.snapChat.style = 'display: none';
      return false;
    }

    navigator.mediaDevices.getUserMedia({
      video: true,
    })
      .then((stream) => {
        this.videoScrn.srcObject = stream;
        this.videoScrn.setAttribute('autoplay', true);
        this.videoScrn.style = 'display: block';
        this.snapBlock.style = 'display: block';
      })
      .catch((err) => {
        window.alert(err);
      });

    this.videoBtn.classList.add('active');
  }

  snap() {
    const that = this;
    this.gifOff = true;

    function calculateSize(srcSize, dstSize) {
      const srcRatio = srcSize.width / srcSize.height;
      const dstRatio = dstSize.width / dstSize.height;
      if (dstRatio > srcRatio) {
        return {
          width: dstSize.height * srcRatio,
          height: dstSize.height,
        };
      }
      return {
        width: dstSize.width,
        height: dstSize.width / srcRatio,
      };
    }

    const video = that.videoScrn;
    const canvas = that.snapChat;
    const videoSize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };
    const canvasSize = {
      width: canvas.width,
      height: canvas.height,
    };
    const renderSize = calculateSize(videoSize, canvasSize);
    const xOffset = (canvasSize.width - renderSize.width) / 2;

    function snapIt() {
      canvas.style = 'display: block';
      canvas.getContext('2d').drawImage(video, xOffset, 0, renderSize.width, renderSize.height);
    }

    let len = this.gifArray.length;
    let timer = 20;
    let downdown;

    function gifIt() {
      canvas.getContext('2d').drawImage(video, xOffset, 0, renderSize.width, renderSize.height);
      const frame = canvas.getContext('2d').getImageData(xOffset, 0, renderSize.width, renderSize.height);
      that.gifArray.push(frame);
    }


    function loopsBoi() {
      if (len >= that.gifArray.length - 1) {
        len = 0;
      } else len += 1;

      that.gifCanvas.getContext('2d').putImageData(that.gifArray[len], xOffset, 0);
    }


    function stopCountdown() {
      clearInterval(downdown);
      that.gogogo = setInterval(loopsBoi, 100);
    }

    function countingDown() {
      timer -= 1;
      that.snapChatBtn.innerHTML = timer;
      gifIt();

      if (timer === 0) {
        that.snapChatBtn.innerHTML = 'Snap!';
        that.snapChatBtn.classList.add('active');
        that.snapChatBtn.classList.remove('woooooooo');
        snapIt();
        stopCountdown();
      }
    }

    function countdown() {
      that.snapChatBtn.classList.remove('active');
      that.gifBro.classList.remove('active');
      that.snapChatBtn.classList.add('woooooooo');
      that.gifCanvas.style = 'display: none';
      that.gifArray = [];
      clearInterval(that.gogogo);
      downdown = setInterval(countingDown, 100);
      that.gifOff = false;
    }


    if (this.videoBtn.classList.contains('active')) {
      this.gifCanvas.style = 'display: none';
      that.snapChatBtn.innerHTML = timer;
      this.snapOff();
      countdown();
    }
  }

  snapOff() {
    this.gifCanvas.style = 'display: none';
    this.snapChat.style = 'display: none';
    this.snapChatBtn.classList.remove('active');
    this.gifBro.classList.remove('active');
  }

  giffy() {
    if (this.gifBro.classList.contains('active')) {
      this.gifCanvas.style = 'display: none';
      this.gifBro.classList.remove('active');
    } else {
      this.gifCanvas.style = 'display: block';
      this.gifBro.classList.add('active');
    }
  }

  clear() {
    const {
      brush,
      loopBtn,
      eraserBtn,
    } = this;
    brush.clear();
    brush.history = [brush.initialHistory];
    brush.reset();

    loopBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
  }

  eraser() {
    const {
      settings,
      eraserBtn,
    } = this;
    settings.eraser = !settings.eraser;
    settings.x = -100;
    settings.y = -100;
    settings.lx = -100;
    settings.ly = -100;
    eraserBtn.classList.toggle('active');
  }

  replay() {
    const {
      brush,
      settings,
      eraserBtn,
    } = this;
    settings.frame = 0;
    settings.x = -100;
    settings.y = -100;
    settings.lx = -100;
    settings.ly = -100;

    if (!settings.replay) {
      brush.clear();
      settings.eraser = false;
      settings.replay = true;

      eraserBtn.classList.remove('active');
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
    } = this;
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
      brush.reset();
      replayBtn.disabled = false;
      eraserBtn.disabled = false;
      clearBtn.disabled = false;
    } else {
      settings.loop = true;
      settings.replay = true;
      replayBtn.disabled = true;
      eraserBtn.disabled = true;
      clearBtn.disabled = true;
    }

    loopBtn.classList.toggle('active');
    eraserBtn.classList.remove('active');
  }

  bliss() {
    document.body.classList.toggle('bliss');
    this.blissBtn.classList.toggle('active');
  }

  sizeUp() {
    this.brush.reset();
    this.settings.size += 2;
    this.sizeCounter = this.settings.size;
    document.getElementById('size').innerHTML = this.settings.size;
  }
  sizeDown() {
    this.brush.reset();
    this.settings.size -= 2;
    this.sizeCounter = this.settings.size;
    document.getElementById('size').innerHTML = this.settings.size;
  }

  sizeSlider(event) {
    this.brush.reset();
    this.settings.size = event.target.value;
    document.getElementById('size').innerHTML = this.settings.size;
  }
}

export default Controls;
