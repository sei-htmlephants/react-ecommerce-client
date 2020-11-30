import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { indexPurchases } from '../../api/purchases'
import messages from '../AutoDismissAlert/messages'

class IndexPurchases extends Component {
  constructor () {
    super()
    this.state = {
      purchases: null
    }
  }

  onIndexPurchases = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    indexPurchases(user)
      // .then(console.log('asdfasd'))
      .then(() => msgAlert({
        heading: 'Index Purchases Success',
        message: messages.indexPurchasesSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      // .then(res => { console.log(res) })
      // .then(res => setPurchases(res.data.purchases))
      // .then(() => this.setState({ purchases: this.state.purchases }))
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
    // if our data has not come in (loading)
    if (!this.state.purchases) {
      purchaseJsx = 'Loading...'
    } else if (this.state.purchases.length === 0) {
      // if we have data but it's empty - no purchases
      purchaseJsx = 'No purchases to display :('
    } else {
      // if we have data to show! purchases
      purchaseJsx = this.state.purchases.map(purchase => (
        <div key={purchase._id}>
          {/* <Link to={'/purchases/' + purchase._id}> */}
          <h3>{purchase.purchaseProduct}</h3>
          {/* </Link> */}
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
