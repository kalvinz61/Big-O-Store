import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from './cartItem'
import {loadCart, deleteProduct} from '../store/cart'
import {addOrder} from '../store/orders'
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

const Checkout = ({cart, fetchCart, removeCartItem, addItemToOrder}) => {
  const classes = useStyles()
  const {products} = cart
  useEffect(() => {
    fetchCart()
  }, [])
  const placeOrder = () => {
    products.map(product => {
      //generate UUIDV4 and send it
      removeCartItem(product)
      addItemToOrder(product)
    })
  }
  return products ? (
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
            placeOrder()
          }}
        >
          Place Order
        </Link>
      </Button>
      <hr />
    </div>
  ) : (
    <div>Your Cart is empty, go buy some products!</div>
  )
}

const mapState = ({cart}) => ({
  cart
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(loadCart()),
  removeCartItem: () => dispatch(deleteProduct()),
  addItemToOrder: () => dispatch(addOrder())
})

export default connect(mapState, mapDispatch)(Checkout)
