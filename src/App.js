import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import SignInAsGuest from './components/SignIn/SignInAsGuest'
import CreatePurchase from './components/CreatePurchase/CreatePurchase'
import IndexPurchases from './components/IndexPurchases/IndexPurchases'
import ShowPurchase from './components/ShowPurchase/ShowPurchase'
import UpdatePurchase from './components/UpdatePurchase/UpdatePurchase'
import CreateProduct from './components/ProductForms/CreateProduct'
import IndexProduct from './components/ProductForms/IndexProducts'
import ShowProduct from './components/ProductForms/ShowProduct'
import UpdateProduct from './components/ProductForms/UpdateProduct'
import StoreFront from './components/StoreFront/StoreFront'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  // setPurchases = purchases => this.setState({ purchases })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <Fragment>
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
              <SignInAsGuest msgAlert={this.msgAlert} setUser={this.setUser} />
            </Fragment>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-purchase' render={() => (
            <CreatePurchase msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/index-purchases' render={() => (
            <IndexPurchases msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/purchases/:purchaseId' render={({ match }) => (
            <ShowPurchase msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/purchase-update/:purchaseId' render={({ match, history }) => (
            <UpdatePurchase msgAlert={this.msgAlert} user={user} match={match} history={history}/>
          )} />

          <AuthenticatedRoute user={user} path='/create-product' render={() => (
            <CreateProduct msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/index-products' render={() => (
            <IndexProduct msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/products/:productId' render={({ match }) => (
            <ShowProduct msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/product-update/:productId' render={({ match, history }) => (
            <UpdateProduct msgAlert={this.msgAlert} user={user} match={match} history={history} />
          )} />

          <Route path='/store' render={() => (
            <StoreFront msgAlert={this.msgAlert} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
