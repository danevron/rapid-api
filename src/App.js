import React, { Component } from 'react';
import Home from './components/Home';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';

import AuthService from './services/AuthService';
import withAuth from './containers/withAuth';
const Auth = new AuthService();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="welcome">Welcome {this.props.user.username}</h2>
          <h2 className="logout" onClick={this.handleLogout.bind(this)}>Logout</h2>
        </header>
        <Home onLocationChange={this.updateLocation.bind(this)} {...this.props}/>
      </div>
    );
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace('/login');
  }

  updateLocation(top, left) {
    Auth.updateProfile({ profile_image_location: { top: top, left: left }});
    this.props.onProfileChange();
  }
}

export default DragDropContext(HTML5Backend)(withAuth(App));
