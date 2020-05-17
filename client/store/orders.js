import axios from 'axios'

const LOAD_ALL_ORDERS = 'LOAD_ALL_ORDERS'
const LOAD_ALL_USERS_ORDERS = 'LOAD_ALL_USERS_ORDERS'
const LOAD_ORDER = 'LOAD_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'

const _loadAllOrders = orders => ({
  type: LOAD_ALL_ORDERS,
  orders
})

const _loadAllUsersOrders = orders => ({
  type: LOAD_ALL_USERS_ORDERS,
  orders
})

const _loadOrder = order => ({
  type: LOAD_ORDER,
  order
})

const _createOrder = product => ({
  type: CREATE_ORDER,
  product
})

export const loadAllOrders = () => {
  return async dispatch => {
    const orders = (await axios.get('/api/orders/all')).data
    dispatch(_loadAllOrders(orders))
  }
}
export const loadAllUsersOrders = () => {
  return async dispatch => {
    const orders = (await axios.get('/api/orders')).data
    dispatch(_loadAllUsersOrders(orders))
  }
}

export const loadOrder = () => {
  return async dispatch => {
    const order = (await axios.get('/api/orders/:id')).data
    dispatch(_loadOrder(order))
  }
}

export const createOrder = (orderId, product, qty) => {
  return async dispatch => {
    const newOrd = (await axios.post('/api/orders', {orderId, product, qty}))
      .data
    dispatch(_createOrder(newOrd))
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_ORDERS:
      return action.order
    case LOAD_ORDER:
      return action.order
    case CREATE_ORDER:
      return {...state, ...action.order}
    default:
      return state
  }
}
