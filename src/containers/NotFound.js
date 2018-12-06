import React, { Component } from "react";

export default class NotFound extends Component{
  state = {seconds: 5}

  componentDidMount(){
    this.interval = setInterval(()=>{
      let seconds = this.state.seconds - 1
      this.setState({seconds}, ()=>{
        if(seconds <= 0) {
          this.props.history.push("/")
        }
      })
      
    }, 1000)  
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render() {
    return (<div className="NotFound">
        <h3>Page not found</h3>
        <p>Redirecting to home in {this.state.seconds} seconds...</p>
    </div>)
  }
}