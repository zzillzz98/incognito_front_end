import React from 'react';
import { Router } from 'react-router-dom';
import history from './history';
import { render as rtlRender } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Snackbar from './snackbar';

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Snackbar />
          {children}
        </Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };