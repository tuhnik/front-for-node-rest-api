import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import {connect} from 'react-redux'
import {logout} from './actions'

class App extends Component {

  logout() {
    this.props.logout()
    this.props.history.push("/login")
  }
  render() {
    return <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            {this.props.authed &&
            <Navbar.Brand>
              <Link to="/users">Users</Link>
            </Navbar.Brand>}
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.props.authed
            ? <NavItem onClick={()=>this.logout()}>Logout</NavItem>
            : <>
                <LinkContainer to="/register">
                  <NavItem>Register</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
          }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>;
  }
}

const mapStateToProps = (state) => {
  return {authed: state.authed, logout};
}

export default withRouter(connect(mapStateToProps, {logout})(App));
