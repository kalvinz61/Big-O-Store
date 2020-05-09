import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './cartItem'
import {loadCart, addProduct} from '../store/cart'
const Cart = ({cart}) => {
  useEffect(() => {
    loadCart()
    addProduct()
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
  loadCart: () => dispatch(loadCart()),
  addProduct: () => dispatch(addProduct())
})

export default connect(mapState, mapDispatch)(Cart)
