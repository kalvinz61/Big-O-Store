import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_CART = 'LOAD_CART'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const _loadCart = cart => ({type: LOAD_CART, cart})

/**
 * THUNK CREATORS
 */

export const loadCart = () => async dispatch => {
  try {
    const cart = await axios.get(`/api/cart`).data
    dispatch(_loadCart(cart))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.product
    default:
      return state
  }
}
