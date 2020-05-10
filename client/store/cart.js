import axios from 'axios'

const LOAD_CART = 'LOAD_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'

const _loadCart = cart => ({
  type: LOAD_CART,
  cart
})

const _addProduct = cart => ({
  type: ADD_PRODUCT,
  cart
})

const _deleteProduct = product => ({
  type: DELETE_CART_PRODUCT,
  product
})
export const loadCart = () => {
  return async dispatch => {
    const cart = (await axios.get('/api/cart')).data
    dispatch(_loadCart(cart))
  }
}

export const addProduct = (product, qty) => {
  return async dispatch => {
    await axios.post('/api/cartsproducts', {product})
    dispatch(_addProduct(product))
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    await axios.delete('/api/cartsproducts', {data: product})
    dispatch(_deleteProduct(product))
  }
}
const initialState = {}
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart
    // case ADD_PRODUCT:
    //   return action.cart
    case DELETE_CART_PRODUCT:
      const newState = {...state}
      newState.products = state.products.filter(
        product => product.id !== action.product.productId
      )
      return newState
    default:
      return state
  }
}
