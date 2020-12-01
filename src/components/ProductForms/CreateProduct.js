import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createProduct } from '../../api/products'
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
    const { productName, productDescription, productPrice, productClass, productCatagory, productImages } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Product</h3>
          <Form onSubmit={this.onCreateProduct}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="productName"
                value={productName}
                placeholder="Enter product's name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                name="productDescription"
                value={productDescription}
                type="text"
                placeholder="Enter product's description"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
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

            <Form.Group controlId="productClass">
              <Form.Label>Product Class</Form.Label>
              <Form.Control
                required
                name="productClass"
                value={productClass}
                type="text"
                placeholder="Enter product's class"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="productCatagory">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                name="productCatagory"
                value={productCatagory}
                type="text"
                placeholder="Enter product's catagory"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="productImages">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                required
                name="productImages"
                value={productImages}
                type="text"
                placeholder="Enter product's images"
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
