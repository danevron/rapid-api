import React, { Component } from 'react';
import Home from './components/Home'
import './App.css'

import AuthService from './services/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="welcome">Welcome {this.props.user.username}</h2>
          <button className="logout" type="button" onClick={this.handleLogout.bind(this)}>Logout</button>
        </header>
        <Home {...this.props}/>
      </div>
    );
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }
}

export default withAuth(App);
