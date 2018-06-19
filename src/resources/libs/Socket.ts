
import * as io from 'socket.io-client';
import globalStore from '../../modules/App/stores/GlobalStore';
const keyFile = require('./Keys.json');

export let start = () => {
  const socket = io.connect(`54.249.78.25:3009/core`, {
    transports : ['websocket'],
    query: {
      token: keyFile.token
    }
  });

  socket.on('connect', () => {
    console.log('*****Socket connected*****');
  });

  socket.on('connect_timeout', (error: any) => {
    console.log(error);
  });
  socket.on('error', (err: any) => {
    console.error(err);
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('event', (data: any) => {
    switch (data.topic) {
      case 'ether.price':
        globalStore.setEtherPrice(data.data);
        break;
      default:
        break;
    }
    console.log('socket', data);
  });
};
