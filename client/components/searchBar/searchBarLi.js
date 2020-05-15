import React from 'react'
import {Link} from 'react-router-dom'

const SearchBarLi = ({product, setText}) => {
  return (
    <li className="product-searchbar-li-container" onClick={() => setText('')}>
      {/* <Link to={`/products/${product.id}`}> */}
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
      <div className="product-searchbar-li-rating">{product.rating}</div>
      {/* </Link> */}
    </li>
  )
}

export {SearchBarLi}
