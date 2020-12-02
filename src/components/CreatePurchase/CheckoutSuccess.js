import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createPurchase } from '../../api/purchases'
import messages from '../AutoDismissAlert/messages'

class CheckoutSuccess extends Component {
  constructor () {
    super()
    this.state = {
      purchaseProduct: '',
      productPrice: ''
    }
  }

  componentDidMount () {
    const { msgAlert, history, user } = this.props

    createPurchase(this.state, user)
      .then(() => msgAlert({
        heading: 'Create Purchase Success',
        message: messages.createPurchaseSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/index-purchases'))
      .catch(error => {
        this.setState({ purchaseProduct: '', productPrice: '' })
        msgAlert({
          heading: 'Purchase Creation Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}

export default withRouter(CheckoutSuccess)
