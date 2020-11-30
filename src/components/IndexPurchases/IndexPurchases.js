import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { indexPurchases } from '../../api/purchases'
import messages from '../AutoDismissAlert/messages'

class IndexPurchases extends Component {
  constructor () {
    super()
    this.state = {
      purchases: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexPurchases(user)

      .then(res => {
        console.log(res)
        this.setState({ purchases: res.data.purchases })
      })

      .then(() => msgAlert({
        heading: 'Index Purchases Success',
        message: messages.indexPurchasesSuccess,
        variant: 'success'
      }))

      .catch(error => {
        msgAlert({
          heading: 'Index Purchases Failed with error: ' + error.message,
          message: messages.indexPurchasesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let purchaseJsx
    if (!this.state.purchases) {
      purchaseJsx = 'Loading...'
    } else if (this.state.purchases.length === 0) {
      purchaseJsx = 'No purchases to display :('
    } else {
      purchaseJsx = this.state.purchases.map(purchase => (
        <div key={purchase._id}>
          <Link to={'/purchases/' + purchase._id}>
            <h3>{purchase.purchaseProduct}</h3>
          </Link>
          <p>${purchase.productPrice}</p>
        </div>
      ))
    }

    return (
      <div>
        <h1>Purchases List</h1>
        {purchaseJsx}
      </div>
    )
  }
}

export default withRouter(IndexPurchases)
