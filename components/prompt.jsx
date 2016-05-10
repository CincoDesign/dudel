import React from "react";

export default React.createClass({
  render: function() {

    var prompt;

    function gamepadSupported() {
      return "getGamepads" in navigator;
    }

    if (gamepadSupported()) {
      prompt = "To begin using your gamepad, connect it and press any button!";
    }

    else {
      prompt = "This browser doesn't support gamepads!";
    }

    return (
      <p>{prompt}</p>
    );
  }
});
