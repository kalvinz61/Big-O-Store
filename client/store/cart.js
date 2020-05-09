import axios from 'axios'

const LOAD_CART = 'LOAD_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'

const _loadCart = cart => ({
  type: LOAD_CART,
  cart
})

const _addToCart = cart => ({
  type: ADD_TO_CART,
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

export const addToCart = product => {
  return async dispatch => {
    const newProd = (await axios.post('/api/cart', product)).data
    dispatch(_addToCart(newProd))
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

// state = {
//     createdAt: "2020-05-09T18:59:19.533Z",
//     id: "2c6445b2-0255-43c5-acac-53427de05499",
//     products: (8)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }],
//     updatedAt: "2020-05-09T18:59:19.533Z",
//     userId: "45e16acb-5173-42d0-9d4a-027ffbaa76f5",
// }

// action.product = {
//     cartId: "2c6445b2-0255-43c5-acac-53427de05499",
//     createdAt: "2020-05-09T18:59:19.572Z",
//     productId: "c508d5e3-db08-4d37-8bf7-110e4532b923",
//     quantity: 1,
//     updatedAt: "2020-05-09T18:59:19.572Z"
// }
