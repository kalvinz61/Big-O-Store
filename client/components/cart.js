import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'
import {Link} from 'react-router-dom'
import {loadCart, addToCart} from '../store/cart'
import {CheckoutForm} from './CheckoutForm'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_qviMXIYeSYKSLyLvzB2yHbIC00QTT2iEZr')

const Cart = ({cart, fetchCart}) => {
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
      <Elements stripe={stripePromise}>
        <CheckoutForm total={total} success={() => setSuccess('succeeded')} />
      </Elements>
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
