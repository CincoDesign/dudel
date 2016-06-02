import React from "react";
import ReactDOM from "react-dom";
import Prompt from './components/prompt';
import Display from './components/controller';

var hasGamepad = false;

var checkForPad = document.createEvent('HTMLEvents');
checkForPad.initEvent('gamepadconnected', true, false);

var checkGP = window.setInterval(function() {
  // console.log('checkGP');
  if (navigator.getGamepads()[0]) {
    if (!hasGamepad)
      window.dispatchEvent(checkForPad);
    window.clearInterval(checkGP);
  }
}, 1);


// ReactDOM.render(
//   <Prompt />,
//   document.getElementById('gamepadPrompt')
// );


// Listen for gamepad
var gamepadListener = function() {
  ReactDOM.render(
    <Display />,
    document.getElementById('gamepadDisplay')
  );
};

window.addEventListener("gamepadconnected", function() {
  hasGamepad = true;
  window.setInterval(gamepadListener, 1);

  window.addEventListener("gamepaddisconnected", function() {
    window.clearInterval(gamepadListener);
  });

});
