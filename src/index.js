import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { store } from "./services/store";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <Route>
          <App />
        </Route>
      </Provider>
      
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
