import React from 'react'
import {Link} from 'react-router-dom'

export const CartItem = product => {
  const {quantity} = product.carts_products
  return (
    <div>
      <div>
        <Link to={`/products/${product.id}`}>{product.name}</Link> x {quantity}
      </div>
      <button>Qty</button>
      <button>Delete</button>
    </div>
  )
}
