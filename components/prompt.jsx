import React from 'react';

const Prompt = () => {
  let prompt;
  const gamepadSupported = () => 'getGamepads' in navigator;

  if (gamepadSupported()) {
    const controller = navigator.getGamepads()[0];
    if (!controller) {
      prompt = 'Dudel requires a touch-enabled device or an Xbox controller.';
    } else {
      prompt = '';
    }
  } else {
    prompt = 'This browser doesn\'t support gamepads or touch-events.';
  }

  return (
    <div>{prompt}</div>
  );
};

module.exports = Prompt;
