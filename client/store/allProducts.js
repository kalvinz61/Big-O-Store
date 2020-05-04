import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _loadProducts = products => ({type: LOAD_PRODUCTS, products})

/**
 * THUNK CREATORS
 */

export const loadProducts = () => async dispatch => {
  try {
    const products = (await axios.get('/api/products')).data
    dispatch(_loadProducts(products))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products
    default:
      return state
  }
}
