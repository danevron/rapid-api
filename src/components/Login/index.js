import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import './index.css';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              placeholder="Username"
              name="username"
              type="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <button className="form-submit" onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (this.state.username && this.state.password) {
      this.Auth.login(this.state.username, this.state.password)
        .then(res =>{
          this.props.history.replace('/');
        })
        .catch(err =>{
          alert(err);
        })
    }
  }
}
