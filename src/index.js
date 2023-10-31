import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// import "leaflet/dist/leaflet.css";
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './i18n';
// import dotenv from 'dotenv';

console.log("ENV", process.env.REACT_APP_API_BASE_URL)
// dotenv.config();
ReactDOM.render(
  // <React.StrictMode>
  <App />
  /* </React.StrictMode>, */,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
