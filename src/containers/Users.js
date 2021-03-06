import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { userService } from '../API'
import DeleteConfirmation from '../components/DeleteConfirmation'
import ShowUserInfo from '../components/ShowUserInfo'
import { logout } from '../actions'
import { connect } from 'react-redux'

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
            this.props.dispatch(logout())
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
    const  {users, error} = this.state
    return (
        <div>
          {this.state.toDelete && <DeleteConfirmation getUsers={this.getUsers} el={this.state.toDelete} cancel={this.deleteUserCancel}/>}
          {this.state.showUserInfo && <ShowUserInfo id={this.state.showUserInfo} close={this.closeUserInfo}/>}
          <h1>User table</h1>
          {users.length > 0 && <p>Total users: {this.state.count}</p>}
          {error && <p>Error: {error.message}</p>}
          <ListGroup>
          {users.length > 0 && users.map((el,i)=>{       
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

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

export default connect(null, mapDispatchToProps)(Users)