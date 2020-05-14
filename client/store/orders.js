import axios from 'axios'

const LOAD_ALL_ORDERS = 'LOAD_ALL_ORDERS'
const LOAD_ORDER = 'LOAD_ORDER'
const ADD_ORDER = 'ADD_ORDER'

const _loadAllOrders = orders => ({
  type: LOAD_ALL_ORDERS,
  orders
})

const _loadOrder = order => ({
  type: LOAD_ORDER,
  order
})

const _addOrder = product => ({
  type: ADD_ORDER,
  product
})

export const loadAllOrders = () => {
  return async dispatch => {
    const orders = (await axios.get('/api/orders')).data
    dispatch(_loadAllOrders(orders))
  }
}

export const loadOrder = () => {
  return async dispatch => {
    const order = (await axios.get('/api/orders/:id')).data
    dispatch(_loadOrder(order))
  }
}

export const addOrder = (orderId, product, qty) => {
  return async dispatch => {
    const newOrd = (await axios.post('/api/orders', orderId, product, qty)).data
    dispatch(_addOrder(newOrd))
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_ORDERS:
      return action.order
    case LOAD_ORDER:
      return action.order
    case ADD_ORDER:
      return {...state, ...action.order}
    default:
      return state
  }
}
