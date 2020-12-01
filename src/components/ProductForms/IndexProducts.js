import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createPurchase } from '../../api/purchases'
import { indexProducts } from '../../api/products'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

  onCreatePurchase = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    createPurchase(this.state, user)
      .then(() => msgAlert({
        heading: 'Create Purchase Success',
        message: messages.createPurchaseSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
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
            <Form onSubmit={this.onCreatePurchase}>
              <Form.Group controlId="purchaseProduct">
                {/* <Form.Label>Product Name</Form.Label> */}
                <Form.Control
                  required
                  type="hidden"
                  name="purchaseProduct"
                  // value={product.productName}
                  value="hello"
                  placeholder="Enter product's name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="productPrice">
                {/* <Form.Label>Product Price</Form.Label> */}
                <Form.Control
                  required
                  name="productPrice"
                  // value={product.productPrice}
                  value="1234"
                  type="hidden"
                  placeholder="Enter product's price"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >Buy</Button>
            </Form>
            {/* <Button variant="outline-primary" onClick={this.buyProduct(product._id)}>Buy</Button> */}
          </Card.Body>
        </Card>

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
