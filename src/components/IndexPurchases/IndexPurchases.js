import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { indexPurchases } from '../../api/purchases'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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

    // .then(() => msgAlert({
    //   heading: 'Index Purchases Success',
    //   message: messages.indexPurchasesSuccess,
    //   variant: 'success'
    // }))

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

        <Card key={purchase._id} className="mb-2" style={{ width: '100%' }}>
          <Card.Header>Purchase on {purchase.createdAt.slice(0, -14)}</Card.Header>
          <Card.Body>
            <Card.Title>{purchase.purchaseProduct}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">${purchase.productPrice}</Card.Subtitle>
            <Card.Text>
            Purchase last updated on: {purchase.createdAt.slice(0, -14)}
            </Card.Text>
            {/* <footer className="blockquote-footer">
                You last updated this purchase on: {purchase.createdAt.slice(0, -14)}
            </footer> */}
            <Button variant="outline-primary" href={'#purchases/' + purchase._id}>See More</Button>
          </Card.Body>
        </Card>

        // <div key={purchase._id}>
        //   <Link to={'/purchases/' + purchase._id}>
        //     <h3>{purchase.purchaseProduct}</h3>
        //   </Link>
        //   <p>${purchase.productPrice}</p>
        // </div>
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
