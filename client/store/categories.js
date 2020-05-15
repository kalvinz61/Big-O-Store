import axios from 'axios'

const initialState = []

const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

const _loadCategories = categories => ({type: LOAD_CATEGORIES, categories})

export const loadCategories = () => async dispatch => {
  try {
    const categories = (await axios.get(`/api/categories/`)).data
    dispatch(_loadCategories(categories))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case LOAD_CATEGORIES:
      newState = action.categories
      return newState
    default:
      return newState
  }
}
