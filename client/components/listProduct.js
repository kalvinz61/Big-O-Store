import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const ListProduct = product => {
  return (
    <div>
      <div className="listProduct">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
        <Button variant="contained" color="primary">
          Add to cart
        </Button>
      </div>
    </div>
  )
}

const mapState = ({product}) => {
  return {
    product
  }
}

export default connect(mapState, null)(ListProduct)
