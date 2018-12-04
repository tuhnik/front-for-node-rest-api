import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {userService} from '../API'

export default class ForgotPassword extends Component {
    constructor(props) {
      super(props);
      this.state = { email: "", error: null, message: null, loading: false };
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      this.setState({loading: true})
      userService.forgotPassword({email: this.state.email}).then(res=>{
        if(res.error) {
          this.setState({error: res.error, message: null, loading: false})
        }
        else {
          this.setState({message: "Password reset link sent!", error: null, email: "", loading: false})
        }
      }).catch(err=>{
        this.setState({error: err.message, loading: false})
      })
    }
  
    render() {
      return (
        <div className="Forgot">
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
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              block
              disabled={this.state.loading}
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