import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ForgotPassword extends Component {
    constructor(props) {
      super(props);
      this.state = { email: "" };
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="Forgot">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              type="submit"
            >
              Send link
            </Button>
            <div className="forgot">
               <Link to="/login">Back</Link>
            </div>    
          </form>   
        </div>
      );
    }
  }