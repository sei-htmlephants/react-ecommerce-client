import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showPurchase, deletePurchase } from '../../api/purchases'

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

  const handleDelete = () => {
    deletePurchase(user, match.params.purchaseId)
      .then(() => {
        msgAlert({
          heading: 'Purchase Deleted',
          message: 'Back to the list of purchases',
          variant: 'success'
        })
      })
      // .then(() => history.push('/purchases'))
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
          {/* temp owner view for dev */}
          <p>{purchase.owner}</p>
          <button onClick={handleDelete}>Delete</button>
          <Link to={'/purchase-update/' + purchase._id}>Update Purchase</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowPurchase)
