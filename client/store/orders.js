import axios from 'axios'

const LOAD_ORDERS = 'LOAD_USERS_ORDERS'
const LOAD_ORDER = 'LOAD_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'

const _loadOrders = orders => ({
  type: LOAD_ORDERS,
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
    dispatch(_loadOrders(orders))
  }
}

export const loadOrders = () => {
  return async dispatch => {
    const orders = (await axios.get('/api/orders/mine')).data
    console.log('ORDERS', orders)
    dispatch(_loadOrders(orders))
  }
}

export const loadOrder = id => {
  return async dispatch => {
    const order = (await axios.get(`/api/orders/${id}`)).data
    dispatch(_loadOrder(order))
  }
}

export const createOrder = () => {
  return async dispatch => {
    const newOrd = (await axios.post('/api/orders')).data
    dispatch(_createOrder(newOrd))
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders
    case LOAD_ORDER:
      return action.order
    case CREATE_ORDER:
      return {...state, ...action.order}
    default:
      return state
  }
}
