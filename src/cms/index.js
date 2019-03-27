import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';

import store from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import '%/styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <App />
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
