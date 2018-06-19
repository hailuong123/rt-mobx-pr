
import * as fetch from './libs/Fetch';
import * as errorParser from './libs/ErrorParser';
import history from './libs/History';

import Popup from './components/Popup';

let lib = {
  fetch,
  history,
  errorParser
};

let ui = {
  Popup
};

export {
  lib,
  ui
};