import React from 'react'
import {connect} from 'react-redux'

export const Product = props => {
  return <div />
}

const mapState = state => {
  return {
    state
  }
}

export default connect(mapState)(Product)
