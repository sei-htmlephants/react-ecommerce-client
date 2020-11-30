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

export const indexPurchases = user => {
  return axios({
    url: apiUrl + '/purchases',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showPurchase = (form, user) => {
  return axios({
    url: apiUrl + '/purchases' + form.purchaseId,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deletePurchase = (form, user) => {
  return axios({
    url: apiUrl + '/purchases' + form.purchaseId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updatePurchase = (form, user) => {
  return axios({
    url: apiUrl + '/purchases',
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
