import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {AddProductForm} from './addProductForm'
import {loadProducts} from '../../store/allProducts'
import {AddDepartmentForm} from './addDepartmentForm'
import {AddCategoryForm} from './addCategoryForm'

const _AdminPageProducts = ({products, loadProds}) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showDepartmentForm, setShowDepartmentForm] = useState(false)

  if (products.length < 1) {
    loadProds()
  }

  function hideAll() {
    setShowAddForm(false)
    setShowDepartmentForm(false)
    return setShowCategoryForm(false)
  }

  function handleShow(e, form) {
    e.preventDefault()
    if (form === 'product') {
      setShowAddForm(!showAddForm)
      setShowDepartmentForm(false)
      return setShowCategoryForm(false)
    } else if (form === 'department') {
      setShowAddForm(false)
      setShowDepartmentForm(!showDepartmentForm)
      return setShowCategoryForm(false)
    } else if (form === 'category') {
      setShowAddForm(false)
      setShowDepartmentForm(false)
      return setShowCategoryForm(!showCategoryForm)
    }
  }

  return (
    <div>
      <button type="button" onClick={e => handleShow(e, 'product')}>
        Add new product
      </button>
      <button type="button" onClick={e => handleShow(e, 'department')}>
        Add new department
      </button>
      <button type="button" onClick={e => handleShow(e, 'category')}>
        Add new category
      </button>
      {showAddForm && <AddProductForm setShow={hideAll} />}
      {showCategoryForm && <AddCategoryForm setShow={hideAll} />}
      {showDepartmentForm && <AddDepartmentForm setShow={hideAll} />}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    loadProds: () => {
      dispatch(loadProducts())
    }
  }
}

export const AdminPageProducts = connect(mapStateToProps, mapDispatch)(
  _AdminPageProducts
)
