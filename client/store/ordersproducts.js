import axios from 'axios'

const ADD_PRODUCT = 'ADD_PRODUCT'

const _addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const addProduct = (orderId, productId) => {
  return async dispatch => {
    const product = (await axios.post('/api/ordersproducts', {
      orderId,
      productId
    })).data
    dispatch(_addProduct(product))
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...state, ...action.order}
    default:
      return state
  }
}
