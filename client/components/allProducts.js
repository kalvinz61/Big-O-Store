import React from 'react'
import {connect} from 'react-redux'
import {Product} from './product'

export const AllProducts = props => {
  return (
    <ul>
      <Product />
    </ul>
  )
}

const mapState = state => {
  return {
    state
  }
}

export default connect(mapState)(AllProducts)
