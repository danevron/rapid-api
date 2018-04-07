import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import Login from './components/Login'

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>
), document.getElementById('root'));
