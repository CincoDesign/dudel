import React from 'react';

const Buttons = () => {
  const xbox = navigator.getGamepads()[0];
  const buttonArray = [];

  let i;
  let buttonText;

  for (i = 0; i < xbox.buttons.length; i++) {
    buttonText = `btn ${i}: `;

    let disp = buttonText;

    if (xbox.buttons[i].pressed) {
      disp = buttonText += 'pressed';
    }

    buttonArray.push(disp);
  }

  return (
    <ul>
      {buttonArray.map((name, index) => <li key={index}>{name}</li>)}
    </ul>
  );
};

const Sticks = () => {
  let i;
  const xbox = navigator.getGamepads()[0];
  const axis = xbox.axes;

  let stickText;
  const stickArray = [];

  for (i = 0; i < axis.length; i++) {
    stickText = `axis ${i}: ${axis[i]}`;

    const disp = stickText;

    stickArray.push(disp);
  }

  return (
    <ul>
      {stickArray.map((name, index) => <li key={index}>{name}</li>)}
    </ul>
  );
};

const Display = () => {
  const xbox = navigator.getGamepads()[0];
  const type = `Connected: ${xbox.id}`;

  // render
  return (
    <div>
      {type}
      <Buttons />
      <Sticks />
    </div>
  );
};

module.exports = Display;
