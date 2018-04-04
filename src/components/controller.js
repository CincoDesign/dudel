/* globals navigator */

import React from 'react';

function Buttons() {
  const xbox = navigator.getGamepads()[0];
  const buttonArray = [];

  let i;
  let buttonText;

  for (i = 0; i < xbox.buttons.length; i += 1) {
    buttonText = `btn ${i}: `;

    let disp = buttonText;

    if (xbox.buttons[i].pressed) {
      disp = `${buttonText}pressed`;
    }

    buttonArray.push(disp);
  }

  return (
    <ul>
      {buttonArray.map(name => <li key={name}>{name}</li>)}
    </ul>
  );
}

function Sticks() {
  let i;
  const xbox = navigator.getGamepads()[0];
  const axis = xbox.axes;

  let stickText;
  const stickArray = [];

  for (i = 0; i < axis.length; i += 1) {
    stickText = `axis ${i}: ${axis[i]}`;

    const disp = stickText;

    stickArray.push(disp);
  }

  return (
    <ul>
      {stickArray.map(name => <li key={name}>{name}</li>)}
    </ul>
  );
}

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

export const buttonList = [
  'A',
  'B',
  'X',
  'Y',
  'LB',
  'RB',
  'LT',
  'RT',
  'SEL',
  'STR',
  'L3',
  'R3',
  'up',
  'down',
  'left',
  'right',
  'sync',
];

export default Display;
