import React, { Component } from "react";
import {userService} from '../API';

export default class Home extends Component {
  state = {error: false, done: false}  

  componentDidMount(){
    userService.activateUser(this.props.match.params.token).then(res=>{
      if(res.error) {
        this.setState({error: res.error})
      }
      this.setState({done: true})
    }).catch(err => {
      this.setState({error: err.message})
    })
  }
  showError(){
      return(
        <>
            <h1>There was a problem!</h1>
            <p>{this.state.error}</p>
        </>
      )
  }

  showSuccess(){
    return(
        <>
            <h1>Welcome!</h1>
            <p>Your E-mail address is successfully verified</p>
            <p>You can now log in!</p>
        </>
      )
  }

  render() {
    return (
      <div className="Home">
        {this.state.done && <div className="lander">
         {this.state.error?this.showError():this.showSuccess()}
        </div>} 
      </div>
    );
  }
}