import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

//const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
  <App />
  </Provider>

  , document.getElementById('root'));
registerServiceWorker();
