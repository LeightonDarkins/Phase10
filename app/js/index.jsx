import React from 'react';
import ReactDOM from 'react-dom';

import Constants from './constants';

import PhaseTen from './phase-ten';

var card = {
  number: 5,
  color: Constants.blue,
}

ReactDOM.render(
  <PhaseTen />,
  document.getElementById('app')
);
