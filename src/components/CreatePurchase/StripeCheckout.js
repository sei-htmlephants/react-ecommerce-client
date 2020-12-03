import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

import { stripePurchase } from '../../api/purchases'

export default class StripeForm extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
    const { msgAlert, history, user, purchaseProduct, productPrice } = this.props
    stripePurchase(purchaseProduct, productPrice, user)
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

  // ...

  render () {
    const { purchaseProduct, productPrice } = this.props
    return (

      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_axNq5LTsIJIZMPAlA6enqySi"
        allowRememberMe="false"
        name={purchaseProduct}
        amount={productPrice * 100}
      ><Button variant="outline-success">Buy</Button>
      </StripeCheckout>

    )
  }
}
