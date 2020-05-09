import axios from 'axios'

const LOAD_CART = 'LOAD_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'

const _loadCart = cart => ({
  type: LOAD_CART,
  cart
})

const _addProduct = cart => ({
  type: ADD_PRODUCT,
  cart
})

export const loadCart = () => {
  return async dispatch => {
    const cart = (await axios.get('/api/cart')).data
    dispatch(_loadCart(cart))
  }
}

export const addProduct = (product, qty) => {
  return async dispatch => {
    const cart = (await axios.get('/api/cart')).data
    const exist = cart.products.find(prod => prod.id === product)
    console.log(`cart - ${cart}`)
    // if(exist)
    // {
    //
    // }
    // else{
    //   dispatch(_addProduct(product))
    // }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart
    case ADD_PRODUCT:
      return action.cart
    default:
      return state
  }
}
