import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showPurchase, updatePurchase } from '../../api/purchases'

const PurchaseUpdate = (props) => {
  const [purchase, setPurchase] = useState({ purchaseProduct: '', purchasePrice: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    // show request
    showPurchase(user, match.params.purchaseId)
      .then(res => setPurchase(res.data.purchase))
      .then(() => msgAlert({
        heading: 'Purchase Show Success',
        message: 'Check it out',
        variant: 'success'
      }))
      // .then(() => history.push('/purchases'))
      .catch(err => msgAlert({
        heading: 'Purchase Show failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setPurchase(oldPurchase => {
      const updatedPurchase = { ...oldPurchase, ...updatedField }
      return updatedPurchase
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updatePurchase(user, purchase, match.params.purchaseId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Nice work',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error Code: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/purchases/${match.params.purchaseId}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Purchase Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Purchased Product"
          value={purchase.purchaseProduct}
          onChange={handleChange}
          name="purchaseProduct"
        />
        {/* <input
          placeholder="Price Paid"
          value={purchase.purchasePrice}
          onChange={handleChange}
          name="purchasePrice"
        /> */}
        <button type="submit">Update Purchase</button>
      </form>
    </React.Fragment>
  )
}

export default PurchaseUpdate
