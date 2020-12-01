import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showProduct, updateProduct } from '../../api/products'

const ProductUpdate = (props) => {
  const [product, setProduct] = useState({ productProduct: '', productPrice: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

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
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error Code: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/product/${match.params.productId}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Product Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product"
          value={product.productName}
          onChange={handleChange}
          name="productName"
        />
        <input
          placeholder="Product Price"
          value={product.productPrice}
          onChange={handleChange}
          name="productPrice"
        />
        <button type="submit">Update Product</button>
      </form>
    </React.Fragment>
  )
}

export default ProductUpdate
