import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Root from '~/client/components/root.jsx';
import reducer from '~/client/reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
