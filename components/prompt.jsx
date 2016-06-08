import React from 'react';

export default React.createClass({
  render: function() {

    var prompt;

    function gamepadSupported () {
      return 'getGamepads' in navigator;
    }

    if (gamepadSupported()) {
      var controller = navigator.getGamepads()[0];

      if (controller.connected) prompt = '';
      else prompt = 'To begin using your gamepad, connect it and press any button!';
    }

    else {
      prompt = 'This browser doesn\'t support gamepads!';
    }

    return (
      <p>{prompt}</p>
    );
  }
});
