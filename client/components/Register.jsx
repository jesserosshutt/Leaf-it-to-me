import React from 'react'
import { connect } from 'react-redux'
import { getDecodedToken, isAuthenticated, register } from 'authenticare/client'
import { Link } from 'react-router-dom'
import { logIn } from '../actions/auth'

import { baseApiUrl as baseUrl } from '../config'

class Register extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    email: '',
  }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleClick = (e) => {
      e.preventDefault()
      const { name, username, password, email } = this.state
      register({ name, username, password, email }, { baseUrl })
        .then((token) => {
          if (isAuthenticated()) {
            const user = getDecodedToken()
            this.props.dispatch(logIn(user))
            this.props.history.push('/saved')
          }
          return null
        })
        .catch(err => alert(err.message))
    }

  handleClick = (e) => {
    e.preventDefault()
    const { name, username, password, email } = this.state
    register({ name, username, password, email }, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          const user = getDecodedToken()
          this.props.dispatch(logIn(user))
          this.props.history.push('/')
        }
        return null
      })
      .catch((err) => alert(err.message))
  }

  render() {
    return (
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <hr/>
        <p>Sign up to add plants to your very own personalised profile where you can keep track of all of your plant needs in one handy location and leaf the rest to your app.</p>
        <form className="signin-form" onSubmit={this.handleClick}>
          <div className="section">
            <label htmlFor="name">
              Name:
            </label>
            <br/>
            <input
              onChange={this.handleChange}
              className="input"
              value={this.state.name}
              autoFocus={true}
              name="name"
              label="Name"
              type="text"
              />
          </div>
          <br />
          <div className="section">
            <label htmlFor="name">
              Email:
            </label>
            <br/>
            <input
              onChange={this.handleChange}
              className="input"
              value={this.state.email}
              name="email"
              label="Name"
              type="text"
              />
          </div>
          <br />
          <div className="section">
            <label htmlFor="name">
                Username:
            </label>
            <br/>
            <input
              onChange={this.handleChange}
              className="input"
              value={this.state.username}
              name="username"
              label="Name"
              type="text"
              alt="Please enter your username here"
              />
          </div>
          <br />
          <div className="section">
            <label htmlFor="name">
              Password:
            </label>
            <br/>
            <input
              onChange={this.handleChange}
              className="input"
              value={this.state.password}
              name="password"
              label="Name"
              type="password"
              />
          </div>
          <br />
          <button className="navy-link submit-button" type="submit">
            Sign Me Up
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(Register)
