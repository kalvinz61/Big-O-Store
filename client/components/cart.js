import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './cartItem'
import {loadCart} from '../store/cart'
const Cart = ({cart, loadCart}) => {
  useEffect(() => {
    loadCart()
  }, [])
  return cart.products ? (
    <div>
      {cart.products.map(product => {
        return <CartItem key={product.id} {...product} />
      })}
      <button>Checkout</button>
    </div>
  ) : (
    <div>Your Cart is empty</div>
  )
}

const mapState = ({cart}) => ({
  cart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(loadCart())
})

export default connect(mapState, mapDispatch)(Cart)
