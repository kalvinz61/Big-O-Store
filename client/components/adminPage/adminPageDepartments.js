import React, {useState} from 'react'
import {connect} from 'react-redux'
import {loadDepartments} from '../../store/departments'
import {AddDepartmentForm} from './addDepartmentForm'

const _AdminPageDepartments = ({departments, loadDeps}) => {
  const [showAddForm, setShowAddForm] = useState(false)

  if (departments.length < 1) {
    loadDeps()
  }

  return (
    <div>
      <button type="button" onClick={() => setShowAddForm(!showAddForm)}>
        Add new department
      </button>
      {showAddForm && <AddDepartmentForm />}
      <ul>
        {departments.map(dept => (
          <li key={dept.id}>
            <h3>{dept.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    departments: state.departments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDeps() {
      return dispatch(loadDepartments())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  _AdminPageDepartments
)
