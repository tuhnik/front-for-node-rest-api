import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

  }

  render() {
    return (
        <div className="Reset">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>New password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm new password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
              block
              bsSize="large"
              type="submit"
            >
              Change
        </Button>
      
      </form>
      </div>
    );
  }
}