import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { userService } from '../API'
import DeleteConfirmation from '../components/DeleteConfirmation'
import ShowUserInfo from '../components/ShowUserInfo'

class Users extends Component {
  state = {users: [], count: null, error: null}
  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = () => {
    userService.getUsers()
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

  deleteUserConfirm = (el) => {
    this.setState({toDelete: el})
  }

  deleteUserCancel = () => {
    this.setState({toDelete: ""})
  }

  userInfo = (id) => {
    this.setState({showUserInfo: id})
  }
  closeUserInfo = () => {
    this.setState({showUserInfo: null})
  }

  render() {
    const  {users} = this.state
    return (
        <div>
          {this.state.toDelete && <DeleteConfirmation getUsers={this.getUsers} el={this.state.toDelete} cancel={this.deleteUserCancel}/>}
          {this.state.showUserInfo && <ShowUserInfo id={this.state.showUserInfo} close={this.closeUserInfo}/>}
          <h1>User table</h1>
          <p>Total users: {this.state.count}</p>
          <ListGroup>
          {users.length && users.map((el,i)=>{       
              return  <ListGroupItem className="user-item" key={i}>{el.email}   
              <ButtonGroup>
                <Button onClick={()=>this.userInfo(el._id)}><Glyphicon glyph="eye-open" /> View</Button>
                <Button onClick={()=>this.deleteUserConfirm(el)}><Glyphicon glyph="remove" /> Delete</Button>              
              </ButtonGroup>
            </ListGroupItem>
          })}
          </ListGroup>
        </div>
    
    );
  }
}

export default Users