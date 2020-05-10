import axios from 'axios'

const LOAD_ORDER = 'LOAD_ORDER'
const ADD_ORDER = 'ADD_ORDER'

const _loadOrder = order => ({
  type: LOAD_ORDER,
  order
})

const _addOrder = product => ({
  type: ADD_ORDER,
  product
})

export const loadOrder = () => {
  return async dispatch => {
    const order = (await axios.get('/api/orders')).data
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
    case LOAD_ORDER:
      return action.order
    case ADD_ORDER:
      return {...state, ...action.order}
    default:
      return state
  }
}
