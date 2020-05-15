import axios from 'axios'

const initialState = []

const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS'

const _loadDepartments = departments => ({type: LOAD_DEPARTMENTS, departments})

export const loadDepartments = () => async dispatch => {
  try {
    const departments = (await axios.get(`/api/departments/`)).data
    dispatch(_loadDepartments(departments))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case LOAD_DEPARTMENTS:
      newState = action.departments
      return newState
    default:
      return newState
  }
}
