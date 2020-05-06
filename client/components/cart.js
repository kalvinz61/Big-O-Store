import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {loadCart} from '../store/cart'
const Cart = ({cart, loadCart}) => {
  console.log('cart', cart)
  // const [cartId, setCartId] = useState('')
  useEffect(() => {
    loadCart()
  }, [])
  return <div />
}

const mapState = ({cart}) => ({
  cart
})

const mapDispatch = dispatch => ({
  loadCart: () => {
    dispatch(loadCart())
  }
})

export default connect(mapState, mapDispatch)(Cart)
