import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const getGuest = () => async dispatch => {
  try {
    //check for the guest in local storage
    const guestID = window.localStorage.getItem('guestID')

    if (!guestID) {
      //if there's NO guest, we have to make a new one, and set it in local storage
      // to the new customer's browser. Local storage has no expiry date, unless we make one for it
      const newGuest = (await axios.post('/auth/guest/new')).data
      window.localStorage.setItem('guestID', newGuest.id)
      return dispatch(getUser(newGuest))
    }
    //Else if that user has already been a guest before, we get that guest back
    const guest = (await axios.post(`/auth/guest`, {guestID: guestID})).data
    return dispatch(getUser(guest))
  } catch (ex) {
    console.log(ex)
  }
}

export const me = () => async dispatch => {
  let res
  try {
    res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    // set the guest ID in localStorage here for retrieval later if the user logs out or session expires
    const guest = (await axios.get('/auth/me')).data
    window.localStorage.setItem('guestID', guest.id)

    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
