import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { indexProducts } from '../../api/products'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class IndexProducts extends Component {
  constructor () {
    super()
    this.state = {
      products: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexProducts(user)

      .then(res => {
        console.log(res)
        this.setState({ products: res.data.products })
      })

      .then(() => msgAlert({
        heading: 'Index Products Success',
        message: messages.indexProductsSuccess,
        variant: 'success'
      }))

      .catch(error => {
        msgAlert({
          heading: 'Index Products Failed with error: ' + error.message,
          message: messages.indexProductsFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let productJsx
    if (!this.state.products) {
      productJsx = 'Loading...'
    } else if (this.state.products.length === 0) {
      productJsx = 'No products to display :('
    } else {
      productJsx = this.state.products.map(product => (

        <Card key={product._id} style={{ width: '24rem' }}>
          <Card.Header>Your product on {product.createdAt.slice(0, -14)}</Card.Header>
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">${product.productPrice}</Card.Subtitle>
            <Card.Text>
            You last updated this product on: {product.createdAt.slice(0, -14)}
            </Card.Text>
            {/* <footer className="blockquote-footer">
                You last updated this product on: {product.createdAt.slice(0, -14)}
            </footer> */}
            <Button variant="outline-primary" href={'/#/products/' + product._id}>See More</Button>
          </Card.Body>
        </Card>

        // <div key={product._id}>
        //   <Link to={'/products/' + product._id}>
        //     <h3>{product.productProduct}</h3>
        //   </Link>
        //   <p>${product.productPrice}</p>
        // </div>
      ))
    }

    return (
      <div>
        <h1>Products List</h1>
        {productJsx}
      </div>
    )
  }
}

export default withRouter(IndexProducts)
