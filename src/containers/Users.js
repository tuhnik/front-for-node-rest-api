import React, { Component } from "react";
import {connect} from 'react-redux'
import {getUsers} from '../API'

class Users extends Component {
  state = {users: [], count: null, error: null}
  componentDidMount = () => {
    getUsers('/users', this.props.token)
    .then(res=>{
        if(res.error){
            this.setState({error: res.error})
        }
        else {
            this.setState({users: res.users, count: res.count})
        }
    })
    .catch(err=>{
        this.setState({error: err})
    })
  }  
  render() {
    const  {users} = this.state
    return (
      <div className="Home">
        <div className="lander">
          <h1>User table</h1>
          <p>This is a secret table</p>
          {users.length && users.map((el,i)=>{
              return <div key={i}>{el.email}</div>
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {token: state.token}
}

export default connect(mapStateToProps)(Users)