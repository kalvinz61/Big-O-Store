import axios from 'axios'

const initialState = []

const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS'
const ADD_DEPARTMENT = 'ADD_DEPARTMENT'

const _loadDepartments = departments => ({type: LOAD_DEPARTMENTS, departments})
const _addDepartment = data => ({type: ADD_DEPARTMENT, department: data})

export const loadDepartments = () => async dispatch => {
  try {
    const departments = (await axios.get(`/api/departments/`)).data
    dispatch(_loadDepartments(departments))
  } catch (err) {
    console.error(err)
  }
}

export const addDepartment = data => async dispatch => {
  try {
    const department = (await axios.post('/api/departments', data)).data
    return dispatch(_addDepartment(department))
  } catch (ex) {
    console.log(ex)
  }
}

export default function(state = initialState, action) {
  let newState = [...state]
  switch (action.type) {
    case LOAD_DEPARTMENTS:
      newState = action.departments
      return newState
    case ADD_DEPARTMENT:
      newState = [...newState, action.department]
      return newState
    default:
      return newState
  }
}
