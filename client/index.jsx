import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Home from './components/home.jsx';
import reducer from './reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app')
);
