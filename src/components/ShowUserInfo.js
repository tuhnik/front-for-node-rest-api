import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap'
import { userService } from '../API'

class ShowUserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: false,
          error: ""
        }
      }
componentDidMount = () => {
    this.show(this.props.id)
}
show = (id) => {
  userService.getUser(id).then((res)=>{
    if(res.error) {
        this.setState({error: res.error})
    }
    else {
        this.setState({user: res})
    }
  }).catch((err)=>{
    this.setState({error: err.message})
  })
}  

render(){
    return <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{this.state.user && this.state.user.email}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Acticated: {this.state.user && this.state.user.activated.toString()}</Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.close}>Close</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </div>
}
}

export default ShowUserInfo
