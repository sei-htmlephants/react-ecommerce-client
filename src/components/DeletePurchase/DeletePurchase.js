import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showPurchase, deletePurchase } from '../../api/purchases'

const deletePurchase = (props) => {
  const [purchase, setPurchase] = useState(null)
  const { user, msgAlert, match } = props

  useEffect(() => {
    deletePurchase(user, match.params.purchaseId)
      .then(res => {
        console.log(res)
        setPurchase(res.data.purchase)
      })
      .then(() => {
        msgAlert({
          heading: 'Delete Purchase Success',
          message: 'Purchase deleted',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Delete Purchase Failed',
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
          message: 'Purchase Successfully Deleted',
          variant: 'success'
        })
      })
      .then(() => history.push('/purchases/'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Failed To Delete: ' + err.message,
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
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(deletePurchase)
