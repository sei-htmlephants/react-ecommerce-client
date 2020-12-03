import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showPurchase, deletePurchase } from '../../api/purchases'
import Button from 'react-bootstrap/Button'

const ShowPurchase = (props) => {
  const [purchase, setPurchase] = useState(null)
  const { user, msgAlert, match, history } = props
  useEffect(() => {
    showPurchase(user, match.params.purchaseId)
      .then(res => {
        console.log(res)
        setPurchase(res.data.purchase)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Purchase Success',
          message: 'Here\'s your purchase!',
          variant: 'success'
        })
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
          <h2>{purchase.purchaseProduct}</h2>
          <h2>${purchase.productPrice}</h2>
          <p>{purchase.owner}</p>
          <Button onClick={handleDelete}>Delete</Button>
          <Button href={'#purchase-update/' + purchase._id}>Update Purchase</Button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowPurchase)
