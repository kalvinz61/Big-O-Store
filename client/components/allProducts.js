import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {addToCart, updateCart} from '../store/cart'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    zIndex: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))
const AllProducts = props => {
  const classes = useStyles()
  const [quantity, setQuantity] = useState(1)
  const {products, add, cart, updateItem} = props

  return (
    <div className="allProducts">
      {products.map(product => {
        return (
          <div key={product.id} className="listProduct">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
              <img src={product.imageUrl} />
            </Link>
            {product.category && <div>{product.category.name}</div>}
            <form className="add-to-cart-form">
              <label>
                Quantity:
                <select
                  defaultValue={1}
                  onChange={ev => {
                    setQuantity(ev.target.value)
                  }}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
              </label>
              <button
                type="button"
                onClick={() => {
                  const item = cart.products.find(
                    prod => prod.id === product.id
                  )
                  if (item) {
                    updateItem(product, quantity)
                  } else {
                    add(product, quantity)
                  }
                }}
              >
                Add to cart
              </button>
            </form>
          </div>
        )
      })}
    </div>
  )
}

const mapState = ({products, cart}) => ({
  products,
  cart
})

const mapDispatch = dispatch => {
  return {
    add: (product, qty) => dispatch(addToCart(product, qty)),
    updateItem: (product, quantity) => dispatch(updateCart(product, quantity))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
