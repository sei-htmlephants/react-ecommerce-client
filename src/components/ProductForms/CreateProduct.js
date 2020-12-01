import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { CreateProduct } from '../../api/products'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateProduct extends Component {
  constructor () {
    super()

    this.state = {
        productName: '',
        productDescription: '',
        productPrice: '',
        productClass: '',
        productCatagory: '',
        productImages: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateProduct = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    createProduct(this.state, user)
      .then(() => msgAlert({
        heading: 'Create Product Success',
        message: messages.createProductSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ productName: '', productDescription: '', productPrice: '', productClass: '', productCategory: '', productImages: '' })
        msgAlert({
          heading: 'Product Creation Failed, error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { createProduct, productPrice } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Product</h3>
          <Form onSubmit={this.onCreateProduct}>
            <Form.Group controlId="createProduct">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="createProduct"
                value={createProduct}
                placeholder="Enter product's name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                name="productPrice"
                value={productPrice}
                type="number"
                placeholder="Enter product's price"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateProduct)
