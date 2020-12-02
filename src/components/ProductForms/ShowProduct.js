import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showProduct, deleteProduct } from '../../api/products'

import Button from 'react-bootstrap/Button'

const ShowProduct = (props) => {
  const [product, setProduct] = useState(null)
  const { user, msgAlert, match, history } = props
  useEffect(() => {
    showProduct(user, match.params.productId)
      .then(res => {
        console.log(res)
        setProduct(res.data.product)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Product Success',
          message: 'Here\'s your product',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Product Failed',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteProduct(user, match.params.productId)
      .then(() => {
        msgAlert({
          heading: 'Product Deleted',
          message: 'Back to the list of prodcuts',
          variant: 'success'
        })
      })
      .then(() => history.push('/index-products'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'error:' + err.message,
          variant: 'danger'
        })
      })
  }
  return (
    <div>
      {product ? (
        <div>
          <h2>{product.productName}</h2>
          <h2>${product.productPrice}</h2>
          <p>{product.owner}</p>
          <Button onClick={handleDelete}>Delete</Button>
          <Button href={'#/product-update/' + product._id}>Update Product</Button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowProduct)
