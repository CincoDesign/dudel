/* globals document */

import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from './src/components/canvas';

const checkForPad = document.createEvent('HTMLEvents');
checkForPad.initEvent('gamepadconnected', true, false);

// Render to Canvas
ReactDOM.render(<Canvas />, document.getElementById('doodleCanvas'));
