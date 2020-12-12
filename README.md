
# React E-Commerce by HTMLephants

A React e-commerce app selling cameras with authentication, product CRUD, Stripe payment processing, purchase history, and purchase history managment.

## Important Links

- [Hosted Site](https://sei-htmlephants.github.io/react-ecommerce-client)
- [API Repo](https://github.com/sei-htmlephants/ecommerce-api)
- [Heroku Hosted API](https://thawing-beach-03969.herokuapp.com)

## Guide

Visit the [demo](https://sei-htmlephants.github.io/react-ecommerce-client). You will not be allowed to purchase any items until you log in. You may log in as a guest user for demo purposes. Buy items with the default Stripe demo card number of `4242 4242 4242 4242` , any valid expiration date, and any three digit CVV.

In order to edit products, you will have to login as the owner of those products. In this demo that user is `a@a` (password: `a`).

To check purchase history, go to your user profile and there will be a link. You may edit titles or delete purchases, but you cannot edit prices paid.

## Development Plan

This project was planned using Jira. MVP user stories were established and given story points. We completed stories in daily sprints using Scrum.

Each team-member worked off `git` feature branches, and pushed to the `dev` branch on feature completion. Changes were reviewed and pulled up to the `main` branch before deployment.

The data is stored in a document database (MongoDB) due to it's relative simplicity. The back-end routes and schemas are viewable [here](https://github.com/sei-htmlephants/ecommerce-api).

## User Stories

- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As an unregistered user, I would like to see all of the products.
- As a signed in user, I would like to add and remove products from a shopping cart.
- As a signed in user, I would like to purchase products in a shopping cart using Stripe.
- As a signed in user, I would like to see all my past orders.

## Technologies Used

### Front-End

- React
- HTML/CSS/Javascript
- Bootstrap

### Back-End

- Node.js
- Express
- MongoDB
- Mongoose
- MongoDB Atlas
- Heroku

## Future Development

- Image uploads
- Shopping cart
- User image forum with voting

## Wireframe and More

[Planning Wireframe & ERD](https://imgur.com/a/sqmwFmF)
