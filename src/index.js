import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const mountNode = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);
