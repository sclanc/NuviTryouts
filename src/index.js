import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Analysis from './Analysis.js';
import './index.css';
import {Router, Route} from 'react-router';
import { browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={App}/>
    <Route path="Analysis" component={Analysis}/>
  </Router>,
  document.getElementById('root')
);
