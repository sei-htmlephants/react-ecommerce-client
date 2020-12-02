import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { indexProducts } from '../../api/products'
import { createPurchase } from '../../api/purchases'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'

import HiddenCreate from '../CreatePurchase/HiddenCreate'

import './ProductForms.scss'

class IndexProducts extends Component {
  constructor () {
    super()
    this.state = {
      products: null
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreatePurchase = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    createPurchase(this.state, user)
      .then(() => {
        msgAlert({
          heading: 'Create Purchase Success',
          message: messages.createPurchaseSuccess,
          variant: 'success'
        })
      })
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
            <Button className="Button" variant="outline-primary" href={'/#/products/' + product._id}>See More</Button>
            <HiddenCreate
              user={this.props.user}
              msgAlert={this.props.msgAlert}
              productPrice={product.productPrice}
              purchaseProduct={product.productName}
            />
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
