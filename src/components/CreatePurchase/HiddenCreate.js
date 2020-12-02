import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

import { createPurchase } from '../../api/purchases'
import messages from '../AutoDismissAlert/messages'

// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './CreatePurchaseStyles.scss'

const stripePromise = loadStripe('pk_test_axNq5LTsIJIZMPAlA6enqySi')

class HiddenCreatePurchase extends Component {
  constructor () {
    super()

    this.state = {
      purchaseProduct: '',
      productPrice: ''
    }
  }

  handleClick = async (event) => {
    const stripe = await stripePromise
    const response = await fetch('http://localhost:4741/create-session', {
      method: 'POST'
    })
    const session = await response.json()
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error) {
    }
  };

  onCreatePurchase = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    if (user) {
      createPurchase(this.props, user)
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
    } else if (!user) { history.push('/sign-in') }
  }

  render () {
    const { purchaseProduct, productPrice } = this.props
    // console.log('try 1', this.props.purchaseProduct, this.props.productPrice)
    // console.log('try 2', purchaseProduct, productPrice)

    return (
      <form onSubmit={this.onCreatePurchase}>
        <input
          required
          type="hidden"
          name="purchaseProduct"
          value={purchaseProduct}
        />
        <input
          required
          name="productPrice"
          value={productPrice}
          type="hidden"
        />
        <Button className="Button"
          variant="outline-success"
          type="submit"
          id="checkout-button"
          role="link"
          // onClick={this.handleClick}
        >
              Buy
        </Button>
      </form>
    )
  }
}

export default withRouter(HiddenCreatePurchase)
