import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap'
import { userService } from '../API'

class DeleteConfirmation extends Component {

delete = (id) => {
  userService.deleteUser(id).then(()=>{
    this.props.getUsers()
    this.props.cancel()
  }).catch((err)=>{
    this.props.cancel()
    console.log(err.message)
  })
  
}  

render(){
    return <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete <b>{this.props.el.email}</b>?</Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.cancel}>Cancel</Button>
        <Button onClick={()=>this.delete(this.props.el._id)}bsStyle="primary">Delete</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </div>
}
}

export default DeleteConfirmation
