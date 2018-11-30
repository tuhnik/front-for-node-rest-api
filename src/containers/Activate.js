import React, { Component } from "react";
import axios from 'axios';

export default class Home extends Component {
  state = {error: false, done: false}  
  componentDidMount(){
      axios.get("http://localhost:5000/users/activate/" + this.props.match.params.id).then(response => {
          this.setState({done: true})
    })
    .catch(error => this.setState({error: error.response.data.error, done: true}))
  }

  error(){
      return(
        <>
            <h1>There was a problem!</h1>
            <p>{this.state.error}</p>
        </>
      )
  }

  success(){
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
         {this.state.error?this.error():this.success()}
        </div>} 
      </div>
    );
  }
}