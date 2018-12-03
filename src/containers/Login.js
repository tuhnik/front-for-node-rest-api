import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {userService} from '../API'
import {connect} from 'react-redux'
import {login} from '../actions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    userService.login({email: this.state.email, password: this.state.password})
    .then(response => {
      if(response.error) {
        this.setState({loading: false, error: response.error})
      }
      else {
        this.props.login(response)
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        this.setState({loading: false, error: null})
        this.props.history.push("/users")
      }     
    })
    .catch(error => {
      this.setState({loading: false, error: error.message})  
    })
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
        {this.state.error && <Alert bsStyle="danger">
                <strong>{this.state.error}</strong>
              </Alert>}
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="username email"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type="submit"
          >
            Login
          </Button>
          <div className="forgot">
             <Link to="/forgot">Forgot password?</Link>
          </div>    
        </form>   
      </div>
    );
  }
}

export default connect(null, {login})(Login);