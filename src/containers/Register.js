import React, { Component } from "react";
import {userService} from '../API'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert
} from "react-bootstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
      message: "",
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
    if(this.state.password !== this.state.confirmPassword) {
      this.setState({error: "Passwords are not matching!"})
      return
    }
    this.setState({loading: true})
    userService.register({email: this.state.email, password: this.state.password})
    .then(response => {
      if(response.error) {
        this.setState({loading: false, error: response.error})
      }
      else {
        this.setState({password: "", confirmPassword: "", email: "", loading: false, error: null, message: "Registered successfully! Please check your email for activation link!"})
      }     
    })
    .catch(error => {
      this.setState({loading: false, error: error.message})  
    })
  }

  render() {
    return (
        <div className="Register">
        <form onSubmit={this.handleSubmit}>
        {this.state.error && <Alert bsStyle="danger">
                <strong>{this.state.error}</strong>
              </Alert>}
        {this.state.message && <Alert bsStyle="warning">
                <strong>{this.state.message}</strong>
        </Alert>}      
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
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
            autoComplete="new-password"
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            autoComplete="new-password"
            type="password"
          />
        </FormGroup>
        <Button
              block
              bsSize="large"
              type="submit"
              disabled={this.state.loading}
            >
              Register
        </Button>
      
      </form>
      </div>
    );
  }
}
