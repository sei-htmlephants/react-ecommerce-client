import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showProduct, deleteProduct } from '../../api/products'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import HiddenCreate from '../CreatePurchase/HiddenCreate'

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
            <Card key={product._id} className="Card">
              <Row>
                <Col sm={6}>
                  <Card.Img variant="top" src={product.productImages} />
                </Col>
                <Col sm={6}>
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">${product.productPrice}</Card.Subtitle>
                    <Card.Text>
                      {product.productDescription}
                    </Card.Text>
                    <HiddenCreate
                      user={user}
                      msgAlert={msgAlert}
                      history={history}
                      productPrice={product.productPrice}
                      purchaseProduct={product.productName}
                    />
                    <p></p>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
                    <Button href={'#product-update/' + product._id}>Update Product</Button>{' '}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Container>
        </Fragment>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowProduct)
