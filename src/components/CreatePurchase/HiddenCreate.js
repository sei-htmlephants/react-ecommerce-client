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

  redirectToSignIn = event => {
    const { history } = this.props
    history.push('/sign-in')
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
  }

  render () {
    const { purchaseProduct, productPrice, user } = this.props
    // console.log('try 1', this.props.purchaseProduct, this.props.productPrice)
    // console.log('try 2', purchaseProduct, productPrice)
    // console.log(user)

    let buyButtonJsx

    if (!user) {
      console.log('user undefined')
      buyButtonJsx =
      <form>
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
          onClick={this.redirectToSignIn}
        >
            Buy
        </Button>

      </form>
    } else {
      console.log('user defined')
      buyButtonJsx =
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
          onClick={this.handleClick}
        >
            Buy
        </Button>

      </form>
    }

    return (
      <div>
        {buyButtonJsx}
      </div>
      // // <form onSubmit={this.onCreatePurchase}>
      // <form>
      //   <input
      //     required
      //     type="hidden"
      //     name="purchaseProduct"
      //     value={purchaseProduct}
      //   />
      //   <input
      //     required
      //     name="productPrice"
      //     value={productPrice}
      //     type="hidden"
      //   />
      //   <Button className="Button"
      //     variant="outline-success"
      //     type="submit"
      //     id="checkout-button"
      //     role="link"
      //     onClick={this.handleClick}
      //   >
      //         Buy
      //   </Button>

    // </form>
    )
  }
}

export default withRouter(HiddenCreatePurchase)
