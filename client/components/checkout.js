import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from './cartItem'
import {loadCart} from '../store/cart'
import {createOrder} from '../store/orders'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {CheckoutForm} from './CheckoutForm'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_qviMXIYeSYKSLyLvzB2yHbIC00QTT2iEZr')

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const Checkout = ({cart, fetchCart, newOrder, user}) => {
  let total = 0
  const classes = useStyles()
  const {products} = cart
  useEffect(() => {
    fetchCart()
    newOrder()
  }, [])
  return (
    <div>
      <span> Checkout ({products && products.length} items)</span>
      <hr />
      <div>
        1. Shipping Address & Payment Method
        <Elements stripe={stripePromise}>
          <CheckoutForm
            total={total}
            user={user}
            // success={() => setSuccess('succeeded')}
          />
        </Elements>
        {}
      </div>
      <hr />
      <div>
        {`2. Items & Shipping`}
        {products &&
          products.map(product => {
            total += product.price * product.carts_products.quantity
            total = Math.round(total * 1e2) / 1e2
            return <CartItem key={product.id} {...product} />
          })}
      </div>
      <hr />
      <Button variant="contained" color="primary">
        <Link
          to="/confirmation"
          onClick={() => {
            newOrder()
          }}
        >
          Place Order
        </Link>
      </Button>
      <hr />
    </div>
  )
}

const mapState = ({cart, user}) => ({
  cart,
  user
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(loadCart()),
  newOrder: () => dispatch(createOrder())
})

export default connect(mapState, mapDispatch)(Checkout)
