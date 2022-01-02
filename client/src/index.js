import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-cqdry0-9.us.auth0.com"
    clientId="SrIK6Q1r0ALWUO3D5Z9IjDmrwitYne2c"
    redirectUri={window.location.origin}
  >
  <BrowserRouter>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
