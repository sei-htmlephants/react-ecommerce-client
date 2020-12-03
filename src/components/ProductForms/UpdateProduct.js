import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showProduct, updateProduct } from '../../api/products'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ProductUpdate = (props) => {
  const [product, setProduct] = useState({ productProduct: '', productPrice: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    // show request
    showProduct(user, match.params.productId)
      .then(res => setProduct(res.data.product))
      .then(() => msgAlert({
        heading: 'Product Show Success',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Product Show failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setProduct(oldProduct => {
      const updatedProduct = { ...oldProduct, ...updatedField }
      return updatedProduct
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateProduct(user, product, match.params.productId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Nice work',
        variant: 'success'
      }))
      .then(() => history.push('/index-products'))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error Code: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/products/${match.params.productId}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Product Information</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="product">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            placeholder="Product"
            value={product.productName}
            onChange={handleChange}
            name="productName"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            placeholder="Enter product's description"
            value={product.productDescription}
            onChange={handleChange}
            name="productDescription"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            placeholder="Product Image"
            value={product.productImages}
            onChange={handleChange}
            name="productImages"
          />
        </Form.Group>
        <Button variant='primary' type="submit">Update Product</Button>
      </Form>
    </React.Fragment>
  )
}

export default ProductUpdate
