import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }

    async componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login')
      }
      else {
        try {
          const profile = await Auth.getProfile()
          this.setState({
            user: profile
          })
        }
        catch(err){
          Auth.logout()
          this.props.history.replace('/login')
        }
      }
    }

    async getProfile() {
      try {
        const profile = await Auth.getProfile()
        this.setState({
          user: profile
        })
      }
      catch(err){
        Auth.logout()
        this.props.history.replace('/login')
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent onProfileChange={this.getProfile.bind(this)} history={this.props.history} user={this.state.user} />
        )
      }
      else {
        return null
      }
    }
  }
}
