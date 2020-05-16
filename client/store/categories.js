import axios from 'axios'

const initialState = []

const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

const _loadCategories = categories => ({type: LOAD_CATEGORIES, categories})
const _addCategory = data => ({type: ADD_CATEGORY, category: data})

export const loadCategories = () => async dispatch => {
  try {
    const categories = (await axios.get(`/api/categories/`)).data
    dispatch(_loadCategories(categories))
  } catch (err) {
    console.error(err)
  }
}

export const addCategory = data => async dispatch => {
  try {
    const category = (await axios.post('/api/categories', data)).data
    dispatch(_addCategory(category))
  } catch (ex) {
    console.log(ex)
  }
}

export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case LOAD_CATEGORIES:
      newState = action.categories
      return newState
    case ADD_CATEGORY:
      newState = [...newState, action.category]
      return newState
    default:
      return newState
  }
}
