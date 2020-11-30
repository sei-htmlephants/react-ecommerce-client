import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showPurchase } from '../../api/purchases'

const showPurchase = (props) => {
  const [purchase, setPurchase] = useState(null)
  const { user, msgAlert, match, history } = props
  
  useEffect(() => {
    showPurchase(user, match.params.purchaseId)
      .then(res => {
        setPurchase(res.data.purchase)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Purchase Success',
          message: `Here's your purchase!`,
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
      {movie ? (
        <div>
          <h2>{purchase.purchaseProduct}</h2>
          <h2>${purchase.purchasePrice}</h2>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowPurchase)
