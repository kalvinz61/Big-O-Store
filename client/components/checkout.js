import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from './cartItem'
import {loadCart} from '../store/cart'
import {createOrder} from '../store/orders'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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

const Checkout = ({cart, fetchCart, newOrder}) => {
  const classes = useStyles()
  const {products} = cart
  useEffect(() => {
    fetchCart()
    newOrder()
  }, [])
  return (
    <div>
      <span> Checkout ({products.length} items)</span>
      <hr />
      <div>
        {`1. Shipping Address`}
        {}
      </div>
      <hr />
      <div>
        {`2. Payment Method`}
        {}
      </div>
      <hr />
      <div>
        {`3. Items & Shipping`}
        {products.map(product => {
          return <CartItem key={product.id} {...product} />
        })}
      </div>
      <hr />
      <Button color="inherit">
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
