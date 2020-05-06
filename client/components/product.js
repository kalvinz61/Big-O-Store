import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {loadProduct} from '../store/product'

const Product = props => {
  const {state, ownProps, load} = props
  useEffect(() => {
    load(ownProps.location.pathname.slice(10))
  }, [])
  return (
    <div>
      <div>{state.product.name}</div>
      <div>{state.product.price}</div>
      <br />
      <button>Add to cart</button>
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    state,
    ownProps
  }
}

const mapDispatch = dispatch => {
  return {
    load: id => {
      dispatch(loadProduct(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Product)
