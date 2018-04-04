/* globals window, document */

import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from './src/components/canvas';
import Display from './src/components/controller';

const checkForPad = document.createEvent('HTMLEvents');
checkForPad.initEvent('gamepadconnected', true, false);

// Render to Canvas
ReactDOM.render(<Canvas />, document.getElementById('doodleCanvas'));

// Listen for gamepad
const gamepadListener = () => {
  ReactDOM.render(<Display />, document.getElementById('gamepadDisplay'));
};

window.addEventListener('gamepadconnected', () => {
  window.setInterval(gamepadListener, 1000);

  window.addEventListener('gamepaddisconnected', () => {
    window.clearInterval(gamepadListener);
  });
});
