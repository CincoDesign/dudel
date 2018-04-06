/* globals navigator */

import React, { Component } from 'react';

function Buttons(props) {
  const buttonArray = [];
  const buttons = props.buttons;

  console.log(buttons);
  let i;
  let buttonText;

  for (i = 0; i < props.buttons.length; i += 1) {
    buttonText = `btn ${i}: `;

    let disp = buttonText;

    if (props.buttons[i].pressed) {
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

function Sticks(props) {
  let i;
  const axis = props.axes;

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

class Display extends Component {
  constructor() {
    super();

    this.state = {
      xbox: {},
    };
  }

  componentWillMount() {
    this.setState({
      xbox: navigator.getGamepads()[0],
    });
  }

  render() {
    const { xbox } = this.state;
    return (
      <div className="pad">
        {`Connected: ${xbox.id}`}
        <Buttons buttons={xbox.buttons} />
        <Sticks axes={xbox.axes} />
      </div>
    );
  }
}

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
