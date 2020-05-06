import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_PRODUCT = 'LOAD_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const _loadProduct = product => ({type: LOAD_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const loadProduct = id => async dispatch => {
  try {
    const product = (await axios.get(`/api/products/${id}`)).data
    dispatch(_loadProduct(product))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCT:
      return action.product
    default:
      return state
  }
}
