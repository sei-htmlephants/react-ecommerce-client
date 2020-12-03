import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showProduct, deleteProduct } from '../../api/products'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../index.scss'

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
      {/* {user.email === 'admin@admin' ? (<Fragment>youre an admin</Fragment>) : (<Fragment>youre a user</Fragment>)} */}

      {product ? (
        <Fragment>
          <Container>
            <Row className="mt-5">
              <Col sm={5}>
                <Container>
                  <Row>
                    <Col><img width="100%" src={product.productImages}></img></Col>
                  </Row>
                </Container>
                <h2>{product.productName}</h2>
                <h2>${product.productPrice}</h2>
              </Col>
              <Col sm={7}>
                <p>{product.productDescription}</p>

                {/* {user.email === 'admin@admin' ? (
                  <Fragment>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
                    <Button href={'#product-update/' + product._id}>Update Product</Button>{' '}
                  </Fragment>)
                  : ('')} */}

                <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
                <Button href={'#product-update/' + product._id}>Update Product</Button>{' '}

              </Col>
            </Row>
          </Container>
        </Fragment>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowProduct)
