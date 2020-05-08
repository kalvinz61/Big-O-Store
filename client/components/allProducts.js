import React from 'react'
import {connect} from 'react-redux'
import ListProduct from './listProduct'

const AllProducts = state => {
  return (
    <div className="allProducts">
      {state.products.map(product => {
        return <ListProduct key={product.id} {...product} />
      })}
    </div>
  )
}

const mapState = state => {
  return state
}

export default connect(mapState, null)(AllProducts)
