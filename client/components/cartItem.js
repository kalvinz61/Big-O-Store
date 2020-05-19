/* eslint-disable react/button-has-type */
import React from 'react'
import {Link} from 'react-router-dom'
import {deleteProduct} from '../store/cart'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'

export const CartItem = product => {
  const {quantity} = product.carts_products

  return (
    <div className="cartListProduct">
      <div>
        <Link to={`/products/${product.id}`}>
          <img style={{height: '40px'}} src={product.imageUrl} />
        </Link>
      </div>
      <React.Fragment>
        {product.name}x {quantity}
      </React.Fragment>
      <Button style={{margin: '.5rem'}} variant="contained" color="primary">
        Qty
      </Button>
      <Button
        style={{margin: '.5rem'}}
        variant="contained"
        color="primary"
        onClick={() => product.deleteProd(product.carts_products)}
      >
        Delete
      </Button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  deleteProd: product => dispatch(deleteProduct(product))
})
export default connect(null, mapDispatch)(CartItem)
