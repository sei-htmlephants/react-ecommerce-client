import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    {/* <Nav.Link href="#change-password">change password</Nav.Link>
    <Nav.Link href="#sign-out">sign out</Nav.Link> */}

    {/* <Nav.Link href="#create-purchase">create purchase test</Nav.Link> */}
    {/* <Nav.Link href="#index-purchases">purchase history</Nav.Link> */}

    {/* <Nav.Link href="#create-product">create product test</Nav.Link> */}
    <Nav.Link href="#index-products">Product List</Nav.Link>

    <Nav.Link href="#user">User</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#home">home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Reactive Cameras
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* { alwaysOptions } */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
