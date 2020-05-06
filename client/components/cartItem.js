import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const CartItem = product => {
  return (
    <div>
      <div>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </div>
      <button>Qty</button>
      <button>Delete</button>
    </div>
  )
}

const mapState = ({product}) => {
  return {
    product
  }
}

export default connect(mapState, null)(CartItem)
