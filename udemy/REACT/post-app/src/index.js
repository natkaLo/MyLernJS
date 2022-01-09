import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import App from './components/app/app';
import App from './components/app/'; //webpack если не указать файл - будет искать index.js


ReactDOM.render(<App/>,document.getElementById('root'));



