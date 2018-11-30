import React from 'react';
const AuthContext = React.createContext();



class AuthProvider extends React.Component {
  state = { isAuth: false, email: null, token: null }

  login = (token, email) => {
    this.setState({ isAuth: true, token, email })
  }
  logout = () =>{
    this.setState({ isAuth: false, token: null, email: null })
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
            isAuth: this.state.isAuth,
            login: this.login,
            logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }