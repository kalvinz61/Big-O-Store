import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {addToCart, updateCart} from '../store/cart'
import {Card, CardMedia, Button, Select} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  allProducts: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  img: {
    height: '200px',
    marginBottom: '.5rem'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    zIndex: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  listProduct: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid 2px black',
    borderRadius: '1rem',
    padding: '1rem',
    margin: '1rem',
    width: '400px',
    backgroundColor: '#ffce0766'
  }
}))
const AllProducts = props => {
  const classes = useStyles()
  const [quantity, setQuantity] = useState(1)
  const {products, add, cart, updateItem} = props
  const handleChange = event => {
    setQuantity(event.target.value)
  }
  return (
    <div className={classes.allProducts}>
      {products.map(product => {
        return (
          <Card key={product.id} className={classes.listProduct}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
              <CardMedia className={classes.img} image={product.imageUrl} />
            </Link>
            {product.category && <div>{product.category.name}</div>}
            <form className="add-to-cart-form">
              <label>
                Quantity:
                <Select defaultValue={1} onChange={handleChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </Select>
              </label>
              <Button
                variant="contained"
                color="primary"
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
              </Button>
            </form>
          </Card>
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
