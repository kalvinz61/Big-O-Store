import React from 'react'
import {connect} from 'react-redux'
import ListProduct from './listProduct'

const AllProducts = state => {
  return (
    <ul>
     {products.products.allProducts.map(product => {
      {state.products.map(product => {
        return <ListProduct key={product.id} {...product} />
     })}
    </ul>
  )
}

const mapState = state => {
  return state
}

export default connect(mapState, null)(AllProducts)
