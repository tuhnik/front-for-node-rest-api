import React, { Component } from "react";
import {connect} from 'react-redux'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import { userService } from '../API'

class Users extends Component {
  state = {users: [], count: null, error: null}
  componentDidMount = () => {
    userService.getUsers(this.props.token)
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
  userClicked = (el) => {
    console.log(el) 
  }
  render() {
    const  {users} = this.state
    return (
      <div className="Home">
        <div>
          <h1>User table</h1>
          <p>Total users: {this.state.count}</p>
          <ListGroup>
          {users.length && users.map((el,i)=>{       
              return  <ListGroupItem onClick={()=>this.userClicked(el)} key={i}>{el.email}</ListGroupItem>
          })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {token: state.token}
}

export default connect(mapStateToProps)(Users)