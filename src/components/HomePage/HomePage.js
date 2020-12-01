import React, { Component } from 'react'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { indexProducts } from '../../api/products'
import { withRouter } from 'react-router-dom'

class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      products: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexProducts(user)
      .then(res => {
        console.log(res)
        this.setState({ products: res.data.products })
      })
      .then(() => msgAlert({
        heading: 'Welcome to the home page!',
        message: messages.homePageSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to display homepage, error: ' + error.message,
          message: messages.homePageFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let productJsx
    if (!this.state.products) {
      productJsx = 'Loading...'
    } else if (this.state.products.length === 0) {
      productJsx = 'No products to display :('
    } else {
      productJsx = this.state.products.map(product => (
        <Card key= {product._id} style={{ width: '24rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the cards content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))
    }

    return (
      <div>
        <h1>Cameras</h1>
        {productJsx}
      </div>
    )
  }
}

export default withRouter(HomePage)
