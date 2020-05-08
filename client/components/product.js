import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {loadProduct} from '../store/product'
import Button from '@material-ui/core/Button'

const Product = props => {
  const {load, product} = props
  useEffect(() => {
    load(props.match.params.id)
  }, [])
  return (
    <div>
      <div>{product.name}</div>
      <div>${product.price}</div>
      <div>Description: {product.description}</div>
      <br />
      <Button variant="contained" color="primary">
        Add to cart
      </Button>
    </div>
  )
}

const mapState = state => {
  return {
    product: state.product
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
