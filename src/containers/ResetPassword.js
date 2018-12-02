import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert
} from "react-bootstrap";
import {checkResetToken} from '../API'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: "",
      tokenErrorMessage: "",
      token: false
    };
  }
  
  componentDidMount = () => {
    checkResetToken("/users/checkresettoken/" + this.props.match.params.email + "/" +this.props.match.params.token)
    .then(res=>{
      if(!res.error) {
        this.setState({token: true})
      }
      else {
        this.setState({token: false, tokenErrorMessage: "Invalid or expired token!"})
      }
    }).catch(err => {
        this.setState({token: false, tokenErrorMessage: "There was an error with token verification!"})
    })
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
      {this.state.tokenErrorMessage && <Alert bsStyle="danger">
                <strong>{this.state.tokenErrorMessage}</strong>
              </Alert>}
      {this.state.token && 
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
      
      </form>}
      </div>
    );
  }
}