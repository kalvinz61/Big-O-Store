
import React, {useEffect, useState} from 'react'

import ProductCard from './productCard'
import {connect} from 'react-redux'
import {loadProducts} from '../store/allProducts'
import {addToCart} from '../store/cart'

const Product = props => {

  //const [quantity, setQuantity] = useState(1)

  const {load, products} = props
  const product = products.find(prod => prod.id === props.match.params.id)
  useEffect(() => {
    load()
  }, [])
  return product ? <ProductCard {...product} /> : null
}

const mapState = ({products}) => ({
  products
})

const mapDispatch = dispatch => {
  return {
    load: () => dispatch(loadProducts()),
    add: (product, qty) => dispatch(addToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(Product)
