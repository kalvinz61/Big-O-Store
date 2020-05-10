import axios from 'axios'

const LOAD_CART = 'LOAD_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'

const _loadCart = cart => ({
  type: LOAD_CART,
  cart
})

const _addToCart = product => ({
  type: ADD_TO_CART,
  product
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

export const addToCart = (product, qty) => {
  return async dispatch => {
    const newProd = (await axios.post('/api/cartsproducts', product)).data
    dispatch(_addToCart(newProd))
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
    case ADD_TO_CART:
      console.log(state.products)
      console.log(action)
      return {...state, products: [...state.products, action.product]}
    case DELETE_CART_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.product.productId
        )
      }
    default:
      return state
  }
}
