import React, {useState} from 'react'
import {connect} from 'react-redux'
import {AddProductForm} from './addProductForm'
import {loadProducts} from '../store/allProducts'

const _AdminPageProducts = ({products, loadProds}) => {
  const [showAddForm, setShowAddForm] = useState(false)

  if (products.length < 1) {
    loadProds()
  }

  return (
    <div>
      <button type="button" onClick={() => setShowAddForm(!showAddForm)}>
        Add new product
      </button>
      {showAddForm && <AddProductForm />}
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
