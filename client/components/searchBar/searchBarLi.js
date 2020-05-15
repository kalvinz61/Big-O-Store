import React from 'react'
import {Link} from 'react-router-dom'

const SearchBarLi = ({product}) => {
  return (
    <li className="product-searchbar-li-container">
      <Link to={`/products/${product.id}`}>
        <div>
          <img className="product-searchbar-li-image" src={product.imageUrl} />
          <div className="product-searchbar-li-name">
            {product.name
              .split(' ')
              .slice(0, 5)
              .join(' ')}
          </div>
        </div>
        <div className="product-searchbar-li-category">{product.category}</div>
        <div className="product-searchbar-li-rating">
          {Array.from(Math.floor(product.rating))
            .fill('*')
            .join('')}
        </div>
      </Link>
    </li>
  )
}

export {SearchBarLi}
