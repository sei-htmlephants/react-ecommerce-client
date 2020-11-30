import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showPurchase } from '../../api/purchases'

const ShowPurchase = (props) => {
  const [purchase, setPurchase] = useState(null)
  const { user, msgAlert, match } = props
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
  return (
    <div>
      {purchase ? (
        <div>
          <h2>{purchase.purchaseProduct}</h2>
          <h2>${purchase.productPrice}</h2>
          <button onClick={handleDelete}>Delete</button>
          <Link to={'/purchase-update/' + purchaseId}>Update Purchase</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowPurchase)
