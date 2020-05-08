import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './productCard'

const AllProducts = state => {
  return (
    <div className="allProducts">
      {state.products.map(product => {
        return <ProductCard key={product.id} {...product} />
      })}
    </div>
  )
}

const mapState = state => {
  return state
}

export default connect(mapState, null)(AllProducts)
