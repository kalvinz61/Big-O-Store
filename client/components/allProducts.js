import React from 'react'
import {connect} from 'react-redux'
import ListProduct from './listProduct'

const AllProducts = products => {
  return (
    <ul>
      {products.products.map(product => {
        return <ListProduct key={product.id} {...product} />
      })}
    </ul>
  )
}

const mapState = ({products}) => {
  return {
    products
  }
}

export default connect(mapState, null)(AllProducts)
