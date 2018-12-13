import React, { Component } from 'react';
import fire from './config/fire';
import Login from './pages/login/login.js';
import Home from './pages/home/home.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  itemsRef = fire.database().ref('user')

  componentDidMount() {
    this.authListner();
  }
  authListner() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // if a user exist
        this.setState({ user });
      } else {
        // if no user exist
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <div className="App">
        {/* If there is an user go to home else go to Login screen */}
        {this.state.user ? (<Home uid={this.state.user.uid}/>) : (<Login />)}
      </div>
    );
  }
}

export default App;
