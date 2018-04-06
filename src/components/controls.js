/* globals document */

class Controls {
  constructor(brush) {
    this.eraserBtn = document.getElementById('eraser');
    this.clearBtn = document.getElementById('clear');
    this.replayBtn = document.getElementById('replay');
    this.loopBtn = document.getElementById('loop');
    this.blissBtn = document.getElementById('bliss');

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
  }

  // upVal(color, target) {
  //   this.settings[color] = parseInt(target.value, 10);
  // }

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
}

export default Controls;
