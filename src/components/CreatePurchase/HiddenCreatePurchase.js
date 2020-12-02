import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createPurchase } from '../../api/purchases'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class HiddenCreatePurchase extends Component {
  constructor () {
    super()

    this.state = {
      purchaseProduct: '',
      productPrice: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreatePurchase = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    createPurchase(this.state, user)
      .then(() => {
        msgAlert({
          heading: 'Create Purchase Success',
          message: messages.createPurchaseSuccess,
          variant: 'success'
        })
      })
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ purchaseProduct: '', productPrice: '' })
        msgAlert({
          heading: 'Purchase Creation Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // const { purchaseProduct, productPrice } = this.state

    return (
      <div className="row">
        <Form onSubmit={this.onCreatePurchase}>
          <Form.Group controlId="purchaseProduct">
            <Form.Control
              required
              type="hidden"
              name="purchaseProduct"
              value='asdf'
              placeholder="Enter product's name"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Control
              required
              name="productPrice"
              value='123'
              type="hidden"
              placeholder="Enter product's price"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
          >
              Buy
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(HiddenCreatePurchase)
