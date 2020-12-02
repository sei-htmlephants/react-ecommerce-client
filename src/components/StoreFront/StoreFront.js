import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { indexProducts } from '../../api/products'
// import { createPurchase } from '../../api/purchases'

import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'

import './StoreFrontStyles.scss'

// import HiddenCreatePurchase from '../CreatePurchase/HiddenCreatePurchase'

class StoreFront extends Component {
  constructor () {
    super()
    this.state = {
      products: null
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props

    indexProducts()

      .then(res => {
        console.log(res)
        this.setState({ products: res.data.products })
      })

      .then(() => msgAlert({
        heading: 'Index Products Success',
        message: messages.indexProductsSuccess,
        variant: 'success'
      }))

      .catch(error => {
        msgAlert({
          heading: 'Index Products Failed with error: ' + error.message,
          message: messages.indexProductsFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div>
        <h1>Products List</h1>
        <CardDeck className="CardDeck">
          <Card>
            <Card.Img variant="top" src="https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9beHK4x3L-8u4h56I3YwHLAQ4G0XzTY4Dg==/Views/1590_D3500_front.png" />
            <Card.Body>
              <Card.Title>Nikon D3500</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">$499.95</Card.Subtitle>
              <Card.Text>
                Cameras
              </Card.Text>
              <Button variant="outline-primary">See More</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Cameras</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9beHK4x3L-8h09FYyKWnWU6L2l14O7STBw==/Views/1585_D850_front.png" />
            <Card.Body>
              <Card.Title>Nikon D850</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">$2,999.95</Card.Subtitle>
              <Card.Text>
                Cameras
              </Card.Text><Button variant="outline-primary">See More</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Cameras</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9beHK4x3L-8lV__2R-oGYSLtLLZ23NPecw3LxAq0r8T8JM3sB7arq619vYZqA-rWrA==/Views/1526_DF_front.png" />
            <Card.Body>
              <Card.Title>Nikon Df</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">$2,749.95</Card.Subtitle>
              <Card.Text>
                Cameras
              </Card.Text><Button variant="outline-primary">See More</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Cameras</small>
            </Card.Footer>
          </Card>
        </CardDeck>
        <CardDeck className="CardDeck">
          <Card>
            <Card.Img variant="top" src="https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-fTYlSZPBjlMhlFa1VHARsAMnUXbUq5ZUAe4O78FpWxbOvgjaYA2KuhSA0zGyd06_VDTAxeJa-7A==/Views/353_2188_AFS-NIKKOR-200-f2G-ED-VR-II_front.png" />
            <Card.Body>
              <Card.Title>AF-S NIKKOR 200mm f/2G ED VR II</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">$5,699.95</Card.Subtitle>
              <Card.Text>
                Lens
              </Card.Text><Button variant="outline-primary">See More</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Accessories</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-fTYlSZPBjlMhlFa1VHARsAMrUXbYi6JXtYUTVVeuNAoAU3F5IGz4IV_aS3-UDOOoyRZIl3_bC0A07YqbsVsTE/Views/353_2205-AF-S-NIKKOR-800mm.png" />
            <Card.Body>
              <Card.Title>AF-S NIKKOR 800mm f/5.6E FL ED VR</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">$16,299.95</Card.Subtitle>
              <Card.Text>
                Lens
              </Card.Text><Button variant="outline-primary">See More</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Accessories</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-fTYlSZPBjlMhlFa1VHARsAM_UXbQi64uXL_w5e-IF0rxJEQvI610iYgexihn7YGzCnDp1iibTJLOEna3VSjsB/Views/353_20063-AF-S-NIKKOR-70-200mm-FL-ED-VR.png" />
            <Card.Body>
              <Card.Title>AF-S NIKKOR 70-200mm f/2.8E FL ED VR</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">$ 2,749.95</Card.Subtitle>
              <Card.Text>
                Lens
              </Card.Text><Button variant="outline-primary">See More</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Accessories</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    )
  }
}

export default withRouter(StoreFront)
