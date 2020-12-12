import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPurchase = (form, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/purchases',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      purchase: {
        purchaseProduct: form.purchaseProduct,
        productPrice: form.productPrice
      }
    }
  })
}

export const stripePurchase = (purchaseProduct, productPrice, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/purchases',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      purchase: {
        purchaseProduct: purchaseProduct,
        productPrice: productPrice
      }
    }
  })
}

export const indexPurchases = user => {
  return axios({
    url: apiUrl + '/purchases-user',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const indexAllPurchases = user => {
  return axios({
    url: apiUrl + '/purchases',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showPurchase = (user, purchaseId) => {
  return axios({
    url: apiUrl + '/purchases/' + purchaseId,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deletePurchase = (user, purchaseId) => {
  return axios({
    url: apiUrl + '/purchases/' + purchaseId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updatePurchase = (user, form, purchaseId) => {
  return axios({
    url: apiUrl + '/purchases/' + purchaseId,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      purchase: {
        purchaseProduct: form.purchaseProduct,
        productPrice: form.productPrice
      }
    }
  })
}
