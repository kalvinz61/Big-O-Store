import axios from 'axios'

const LOAD_CART = 'LOAD_CART'
const ADD_TO_CART = 'ADD_TO_CART'
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
    console.log('dispatch load cart')
    dispatch(_loadCart(cart))
  }
}

export const addProduct = (product, qty) => {
  return async dispatch => {
    const newProd = (await axios.post('/api/cart', product)).data
    dispatch(_addProduct(newProd))
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    await axios.delete('/api/cartsproducts', {data: product})
    console.log('should dispatch delete now', product) //does not get logged
    dispatch(_deleteProduct(product))
  }
}
const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart
    case ADD_PRODUCT:
      return action.cart
    case DELETE_CART_PRODUCT:
      const newList = state.products.filter(product => {
        return product.id !== action.productId
      })
      state.products = newList
      return state
    default:
      return state
  }
}
