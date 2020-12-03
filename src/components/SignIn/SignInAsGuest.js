import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: 'a@a',
      password: 'a'
    }
  }

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Welcome!',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <Form onSubmit={this.onSignIn}>
        <Button
          variant="link"
          type="submit"
          className="pl-0"
        >
          Sign In As Guest
        </Button>
      </Form>
    )
  }
}

export default withRouter(SignIn)
