import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showPurchase, updatePurchase } from '../../api/purchase'

const PurchaseUpdate = (props) => {
  const [movie, setPurchase] = useState({ title: '', director: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    // show request
    showPurchase(user, match.params.movieId)
      .then(res => setPurchase(res.data.purchase))
      .then(() => msgAlert({
        heading: 'Movie Show Success',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Movie Show failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setPurchase(oldPurcase => {
      const updatedMovie = { ...oldPurcase, ...updatedField }
      return updatedMovie
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updatePurchase(user, purchase, match.params.purchaseId)
      .then(() => setUpdated(true))
      // Instead of state + Redirect pairing, you can also use `history`
      // as long as the component is exported `withRouter` or is passed the
      // `history` prop explicitely (see the `App.js` file)
      // This object can be destructured from the `props` as well.
      // The `MovieShow` component uses this pattern for delete
      // .then(() => props.history.push('/movie-show/' + match.params.movieId))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Nice work',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'WhOOPs ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/purchase/${match.params.id}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Movie Title Here"
          value={movie.title}
          onChange={handleChange}
          name="title"
        />
        <input
          placeholder="Movie Director Here"
          value={movie.director}
          onChange={handleChange}
          name="director"
        />
        <button type="submit">Update Movie</button>
      </form>
    </React.Fragment>
  )
}

export default PurchaseUpdate
