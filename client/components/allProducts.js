import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './productCard'

const AllProducts = ({products}) => {
  return (
    <div className="allProducts">
      {products.map(product => {
        return <ProductCard key={product.id} {...product} />
      })}
    </div>
  )
}

const mapState = ({products}) => ({
  products
})

export default connect(mapState, null)(AllProducts)
