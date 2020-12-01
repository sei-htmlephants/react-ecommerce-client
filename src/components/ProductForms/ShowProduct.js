import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showProduct, deleteProduct } from '../../api/products'

const ShowProduct = (props) => {
  const [product, setProduct] = useState(null)
  const { user, msgAlert, match } = props
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
      .catch(err => {
        msgAlert({
          heading: 'Deletion ',
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
          <button onClick={handleDelete}>Delete</button>
          <Link to={'/product-update/' + product._id}>Update Product</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowProduct)
