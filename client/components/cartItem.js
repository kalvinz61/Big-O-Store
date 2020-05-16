/* eslint-disable react/button-has-type */
import React from 'react'
import {Link} from 'react-router-dom'
import {deleteProduct} from '../store/cart'
import {connect} from 'react-redux'

export const CartItem = product => {
  const {quantity} = product.carts_products

  return (
    <div>
      <div>
        <Link to={`/products/${product.id}`}>{product.name}</Link> x {quantity}
      </div>
      <button>Qty</button>
      <button onClick={() => product.deleteProd(product.carts_products)}>
        Delete
      </button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  deleteProd: product => dispatch(deleteProduct(product))
})
export default connect(null, mapDispatch)(CartItem)
