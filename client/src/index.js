import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gardenReducer from "./Garden/components/redux/reducers/garden";
// import allReducers from './redux/reducers'
const store = createStore(gardenReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>

  </BrowserRouter>,
  document.getElementById("root")
);
export default store;