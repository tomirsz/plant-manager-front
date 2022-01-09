import React, {Component} from 'react';
import NavBar from './Components/NavBar';
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      currentUser: false,
      registerUser: false
    };
  }

  currentUser = (value) => {
    this.setState({currentUser: value});
  }

  registerUser = (value) => {
    this.setState({registerUser: value});
  }

  render() {

    return (
        <div>
          {this.state.currentUser && !this.state.registerUser && (
              <NavBar onLoginUser={this.currentUser}/>
          )}
          {!this.state.currentUser && !this.state.registerUser && (
              <LoginPage onLoginUser={this.currentUser} onUserRegister={this.registerUser}/>
          )}
          {!this.state.currentUser && this.state.registerUser && (
              <RegisterPage onUserRegister={this.registerUser}/>
          )}
        </div>
    );
  }
}

export default App;
