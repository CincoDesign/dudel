import React from 'react';
import ReactDOM from 'react-dom';
// import Prompt from './components/prompt';
import Display from './components/controller';
import Canvas from './components/canvas';

let hasGamepad = false;

const checkForPad = document.createEvent('HTMLEvents');
checkForPad.initEvent('gamepadconnected', true, false);

// const checkInterval = window.setInterval(() => {
//   // console.log('checkInterval');
//   if (navigator.getGamepads !== undefined) {
//     if (!hasGamepad) {
//       window.dispatchEvent(checkForPad);
//       window.clearInterval(checkInterval);
//     }
//   }
// }, 1);

// ReactDOM.render(
//   <Prompt />,
//   document.getElementById('gamepadPrompt')
// );

// Render to Canvas
ReactDOM.render(
  <Canvas />, document.getElementById('gameCanvas'));

// Listen for gamepad
const gamepadListener = () => {
  ReactDOM.render(
    <Display />, document.getElementById('gamepadDisplay'));
};

window.addEventListener('gamepadconnected', () => {
  hasGamepad = true;

  window.setInterval(gamepadListener, 1);

  window.addEventListener('gamepaddisconnected', () => {
    window.clearInterval(gamepadListener);
  });
});
