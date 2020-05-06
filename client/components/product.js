import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {loadProduct} from '../store/product'
import Button from '@material-ui/core/Button'

const Product = props => {
  const {state, ownProps, load} = props
  useEffect(() => {
    load(ownProps.location.pathname.slice(10))
  }, [])
  return (
    <div>
      <div>{state.product.name}</div>
      <div>${state.product.price}</div>
      <div>Description: {state.product.description}</div>
      <br />
      <Button variant="contained" color="primary">
        Add to cart
      </Button>
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
