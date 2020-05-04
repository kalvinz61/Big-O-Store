import React from 'react'
import {connect} from 'react-redux'

const ListProduct = product => {
  console.log(product)
  return <div>{product.name}</div>
}

const mapState = ({product}) => {
  return {
    product
  }
}

export default connect(mapState, null)(ListProduct)
