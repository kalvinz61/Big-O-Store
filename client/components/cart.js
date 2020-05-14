import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'
import {Link} from 'react-router-dom'
import {loadCart, addToCart} from '../store/cart'
const Cart = ({cart, fetchCart, addProd}) => {
  const {products} = cart
  useEffect(() => {
    fetchCart()
  }, [])
  return products && products.length ? (
    <div>
      {products.map(product => {
        return <CartItem key={product.id} {...product} />
      })}
      <button type="button">
        <Link to="/checkout">Checkout</Link>
      </button>
    </div>
  ) : (
    <div>
      <div>Your Cart is empty, go buy some stuff!</div>
      <button type="button">
        <Link to="/home">Home</Link>
      </button>
    </div>
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
