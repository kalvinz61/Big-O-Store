import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'
import {loadCart, addProduct} from '../store/cart'
const Cart = ({cart, fetchCart, addProd}) => {
  const {products} = cart
  console.log('cart', cart)
  useEffect(() => {
    fetchCart()
    addProd()
  }, [])
  return products ? (
    <div>
      {products.map(product => {
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
  fetchCart: () => dispatch(loadCart()),
  addProd: () => dispatch(addProduct())
})

export default connect(mapState, mapDispatch)(Cart)
