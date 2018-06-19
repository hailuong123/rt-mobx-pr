import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import { Provider } from 'mobx-react';

import registerServiceWorker from './registerServiceWorker';
import AppContainer from './modules/App/containers/App';
import globalStore from './modules/App/stores/GlobalStore';
import { loadGlobal } from './modules/App/api/GlobalApi';

import { start as startSocket } from './resources/libs/Socket';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import './resources'; 

// Enable MobX Strict Functionality
mobx.useStrict(true);

const init = async () => {
  const stores = { globalStore };
  const global = await loadGlobal();
  startSocket();

  if (global) {
    globalStore.setGlobal(global);
  }
  
  ReactDOM.render(
    <Provider {...stores}>
      <AppContainer />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
};

init();

registerServiceWorker();
