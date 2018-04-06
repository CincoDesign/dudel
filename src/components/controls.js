/* globals document */


const width = window.innerWidth;
const height = window.innerHeight;


class Controls {
  constructor(brush) {
    this.eraserBtn = document.getElementById('eraser');
    this.clearBtn = document.getElementById('clear');
    this.replayBtn = document.getElementById('replay');
    this.loopBtn = document.getElementById('loop');
    this.blissBtn = document.getElementById('bliss');
    this.videoBtn = document.getElementById('videoBtn');

    this.videoScrn = document.getElementById('video');

    this.sizeUpBtn = document.getElementById('sizeUp');
    this.sizeDownBtn = document.getElementById('sizeDown');

    this.snapChat = document.getElementById('basicallySnapchat');
    this.snapChatBtn = document.getElementById('snapBtn');
    this.snapBlock = document.getElementById('snapBlock');
    this.snapOffBtn = document.getElementById('snapOff');


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
    this.sizeUpBtn.addEventListener('click', () => this.sizeUp());
    this.sizeDownBtn.addEventListener('click', () => this.sizeDown());

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

    this.videoScrn.width = this.snapChat.width = width;
    this.videoScrn.height = this.snapChat.height = height;

    this.sizeCounter = this.settings.size;
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

    navigator.mediaDevices.getUserMedia({ video: true })
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

    if (this.videoBtn.classList.contains('active')) {
      const video = this.videoScrn;
      const canvas = this.snapChat;
      const videoSize = { width: video.videoWidth, height: video.videoHeight };
      const canvasSize = { width: canvas.width, height: canvas.height };
      const renderSize = calculateSize(videoSize, canvasSize);
      const xOffset = (canvasSize.width - renderSize.width) / 2;

      canvas.style = 'display: block';

      canvas.getContext('2d').drawImage(video, xOffset, 0, renderSize.width, renderSize.height);
    }
  }

  snapOff() {
    this.snapChat.style = 'display: none';
  }

  clear() {
    const { brush, loopBtn, eraserBtn } = this;
    brush.clear();
    brush.history = [brush.initialHistory];
    brush.reset();

    loopBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
  }

  eraser() {
    const { settings, eraserBtn } = this;
    settings.eraser = !settings.eraser;
    settings.x = -100;
    settings.y = -100;
    settings.lx = -100;
    settings.ly = -100;
    eraserBtn.classList.toggle('active');
  }

  replay() {
    const { brush, settings, eraserBtn } = this;
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
      brush, settings, replayBtn, loopBtn, eraserBtn, clearBtn,
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
}

export default Controls;
