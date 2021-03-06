import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showPurchase, deletePurchase } from '../../api/purchases'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const ShowPurchase = (props) => {
  const [purchase, setPurchase] = useState(null)
  const { user, msgAlert, match, history } = props
  useEffect(() => {
    showPurchase(user, match.params.purchaseId)
      .then(res => {
        // console.log(res)
        setPurchase(res.data.purchase)
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Purchase Failed',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deletePurchase(user, match.params.purchaseId)
      .then(() => {
        msgAlert({
          heading: 'Purchase Deleted',
          message: 'Back to the list of purchases',
          variant: 'success'
        })
      })
      .then(() => history.push('/index-purchases'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      {purchase ? (
        <div>
          <Card key={purchase._id} className="mb-2 mt-2" style={{ width: '100%' }}>
            <Card.Header>Purchase on {purchase.createdAt.slice(0, -14)}</Card.Header>
            <Card.Body>
              <Card.Title>{purchase.purchaseProduct}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">${purchase.productPrice}</Card.Subtitle>
              <Card.Text>
            Purchase last updated on: {purchase.createdAt.slice(0, -14)}
              </Card.Text>
              {(user._id === purchase.owner) ? (
                <div>
                  <Button variant="danger" onClick={handleDelete}>Delete</Button>{' '}
                  <Button href={'#purchase-update/' + purchase._id}>Update Purchase</Button>{' '}
                </div>
              ) : ''}
            </Card.Body>
          </Card>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowPurchase)
