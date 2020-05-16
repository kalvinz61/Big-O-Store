import React, {useState} from 'react'
import {connect} from 'react-redux'
import {loadCategories} from '../../store/categories'
import {AddCategoryForm} from './addCategoryForm'

const _AdminPageCategories = ({categories, loadCats}) => {
  const [showAddForm, setShowAddForm] = useState(false)

  if (categories.length < 1) {
    loadCats()
  }

  return (
    <div>
      <button type="button" onClick={() => setShowAddForm(!showAddForm)}>
        Add new category
      </button>
      {showAddForm && <AddCategoryForm />}
      <ul>
        {categories.map(catg => (
          <li key={catg.id}>
            <h3>{catg.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCats() {
      return dispatch(loadCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  _AdminPageCategories
)
