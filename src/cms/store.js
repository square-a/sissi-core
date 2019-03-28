import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { connectRoutes } from 'redux-first-router';
import {
  localizeReducer,
  initialize,
} from 'react-localize-redux';
import { reducer as formReducer } from 'redux-form';
import { renderToStaticMarkup } from 'react-dom/server';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import * as middlewares from '%/middleware';
// not exported with other middlewares to make sure gatherRequestData middleware is executed first
import gatherRequestDataMiddleware from '%/middleware/gatherRequestData';

import * as reducers from '%/reducers';
import routerOptions from '%/router/options';
import routes from '%/router';
import translations from '%/translations';

// Setup Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const customMiddleware = Object.values(middlewares);
const history = createHistory();

const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
} = connectRoutes(history, routes, routerOptions);

const middleware = applyMiddleware(
  locationMiddleware,
  thunk,
  gatherRequestDataMiddleware,
  ...customMiddleware,
);

const store = createStore(
  combineReducers({
    location: locationReducer,
    form: formReducer,
    localize: localizeReducer,
    ...reducers,
  }),
  composeEnhancers(locationEnhancer, middleware)
);

const localizeOptions = {
  languages: ['en', 'de'],
  translation: translations,
  options: {
    renderToStaticMarkup,
    onMissingTranslation: ({ defaultTranslation }) => defaultTranslation || '',
  },
};

store.dispatch(initialize(localizeOptions));

export default store;
