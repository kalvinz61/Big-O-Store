import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'

const Cart = props => {
  return (
    <div>
      <button>Checkout</button>
      <ul>
        {
          // props.cart.products.map( products =>
          // {
          //     return(
          //         <CartItem key = { product.id } {...product} />
          //     )
          // })
        }
      </ul>
    </div>
  )
}

const mapState = state => {
  return {
    state
  }
}

export default connect(mapState, null)(Cart)
