import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert
} from "react-bootstrap";
import { userService } from '../API'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      loading: false,
      confirmPassword: "",
      tokenErrorMessage: "",
      error: "",
      message: "",
      token: false
    };
  }
  
  componentDidMount = () => {
    userService.checkResetToken(this.props.match.params.email, this.props.match.params.token)
    .then(res=>{
      if(!res.error) {
        this.setState({token: this.props.match.params.token, email: this.props.match.params.email})
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
    if(this.state.password !== this.state.confirmPassword){
      this.setState({error: "Passwords are not matching!"})
      return;
    }
    this.setState({loading: true})
    userService.resetPassword({token: this.state.token, email: this.state.email, password: this.state.password}).then(res=>{
      if(res.error) {
        this.setState({error: res.error, message: "", loading: false})
      }
      else {
        this.setState({message: res.message, error: "", password:"", confirmPassword: "", loading: false})
      }
    }).catch(err=>{
      this.setState({error: err, message: "", loading: false})
    })

  }

  showError = () => {
    return (<Alert bsStyle="danger">
          <strong>{this.state.error}</strong>
    </Alert>)
  }
  
  showMessage = () => {
    return (<Alert bsStyle="warning">
          <strong>{this.state.message}</strong>
    </Alert>)
  }

  render() {
    return (      
      <div className="Reset">
      {this.state.tokenErrorMessage && <Alert bsStyle="danger">
                <strong>{this.state.tokenErrorMessage}</strong>
              </Alert>}
      {this.state.token &&  
        <form onSubmit={this.handleSubmit}>
        {this.state.error && this.showError()}
        {this.state.message && this.showMessage()}
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
              disabled={this.state.loading}
            >
              Change
        </Button>    
      </form>}
      </div>
    );
  }
}