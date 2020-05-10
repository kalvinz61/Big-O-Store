import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'
import {loadCart, addToCart} from '../store/cart'
const Cart = ({cart, fetchCart, addProd}) => {
  const {products} = cart
  console.log(products)
  useEffect(() => {
    fetchCart()
  }, [])
  return products ? (
    <div>
      {products.map(product => {
        return <CartItem key={product.id} {...product} />
      })}
      <button type="button">Checkout</button>
    </div>
  ) : (
    <div>Your Cart is empty</div>
  )
}

const mapState = ({cart}) => ({
  cart
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(loadCart()),
  addProd: () => dispatch(addToCart())
})

export default connect(mapState, mapDispatch)(Cart)
