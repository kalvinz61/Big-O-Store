import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'
import {Link} from 'react-router-dom'
import {loadCart, addToCart} from '../store/cart'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_qviMXIYeSYKSLyLvzB2yHbIC00QTT2iEZr')

const Cart = ({user, cart, fetchCart}) => {
  const [success, setSuccess] = useState('incomplete')
  const {products} = cart
  let total = 0

  useEffect(() => {
    //redux store works,
    //but we call fetchCart here just so it doesnt break when we refresh on page
    fetchCart()
  }, [])
  return products && products.length ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      {products.map(product => {
        total += product.price * product.carts_products.quantity
        total = Math.round(total * 1e2) / 1e2
        return <CartItem key={product.id} {...product} />
      })}
      Total: ${total}
      <Link to="/checkout">Checkout</Link>
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

const mapState = ({cart, user}) => ({
  cart,
  user
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(loadCart()),
  addProd: () => dispatch(addToCart())
})

export default connect(mapState, mapDispatch)(Cart)
