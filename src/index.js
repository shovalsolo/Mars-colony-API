import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Report from './Report';
import Encounters from './Encounters';
import CheckIn from './CheckIn';
import registerServiceWorker from './registerServiceWorker';
import { Router,Route } from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
