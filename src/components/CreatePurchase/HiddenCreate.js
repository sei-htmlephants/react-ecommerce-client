import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import './CreatePurchaseStyles.scss'

import StripeForm from './StripeCheckout'

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

  render () {
    const { purchaseProduct, productPrice, user } = this.props
    let buyButtonJsx

    if (!user) {
      buyButtonJsx =
        <Button className="Button"
          variant="outline-success"
          onClick={this.redirectToSignIn}
        >
            Sign-in to See More
        </Button>
    } else {
      buyButtonJsx =
        <StripeForm
          purchaseProduct={purchaseProduct}
          productPrice={productPrice}
          user={this.props.user}
          msgAlert={this.props.msgAlert}
          history={this.props.history}
        />
    }

    return (
      <div>
        {buyButtonJsx}
      </div>
    )
  }
}

export default withRouter(HiddenCreatePurchase)
