import apiUrl from '../apiConfig'
import axios from 'axios'

export const createProduct = (form, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/products',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      product: {
        productName: form.productName,
        productDescription: form.productDescription,
        productPrice: form.productPrice,
        productClass: form.productClass,
        productCatagory: form.productCatagory,
        productImages: form.productImages
      }
    }
  })
}

export const indexProducts = () => {
  return axios({
    url: apiUrl + '/products',
    method: 'GET'
    // headers: {
    //   'Authorization': `Token token=${user.token}`
    // }
  })
}

export const showProduct = (user, productId) => {
  return axios({
    url: apiUrl + '/products/' + productId,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteProduct = (user, productId) => {
  return axios({
    url: apiUrl + '/products/' + productId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updateProduct = (user, form, productId) => {
  return axios({
    url: apiUrl + '/products/' + productId,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      product: {
        productName: form.productName,
        productDescription: form.productDescription,
        productPrice: form.productPrice,
        productClass: form.productClass,
        productCatagory: form.productCatagory,
        productImages: form.Images
      }
    }
  })
}
