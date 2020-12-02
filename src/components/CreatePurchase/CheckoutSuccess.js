import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import { createPurchase } from '../../api/purchases'
// import messages from '../AutoDismissAlert/messages'

class CheckoutSuccess extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  // componentDidMount () {
  //   const { user } = this.props

  //   // createPurchase(this.state, user)
  // }
  render () {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}

export default withRouter(CheckoutSuccess)
