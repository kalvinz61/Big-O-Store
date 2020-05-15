import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _loadProducts = products => ({type: LOAD_PRODUCTS, products})
const _addProduct = data => ({type: ADD_PRODUCT, product: data})
/**
 * THUNK CREATORS
 */

export const loadProducts = () => async dispatch => {
  try {
    const products = (await axios.get(`/api/products/`)).data
    dispatch(_loadProducts(products))
  } catch (err) {
    console.error(err)
  }
}

export const loadSearchedProducts = (
  filter,
  search = false
) => async dispatch => {
  try {
    const products = (await axios.get(`/api/products/${filter}`)).data
    console.log('PRODS THUNK', products)
    if (search) {
      return dispatch(_loadProducts(products))
    }
    return products
  } catch (err) {
    console.error(err)
  }
}

export const addProduct = data => async dispatch => {
  try {
    console.log('DATA', data)
    const product = (await axios.post('/api/products', data)).data
    dispatch(_addProduct(product))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case LOAD_PRODUCTS:
      newState = action.products
      return newState
    case ADD_PRODUCT:
      newState = [...newState, action.product]
      return newState
    default:
      return newState
  }
}
