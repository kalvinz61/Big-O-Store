import axios from 'axios'

const LOAD_CART = 'LOAD_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const _loadCart = cart => ({
  type: LOAD_CART,
  cart
})

const _addToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

export const loadCart = () => {
  return async dispatch => {
    const cart = (await axios.get('/api/cart')).data
    dispatch(_loadCart(cart))
  }
}
const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart
    default:
      return state
  }
}
