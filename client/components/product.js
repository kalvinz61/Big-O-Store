import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {loadProducts} from '../store/allProducts'
import {addToCart, loadCart, updateCart} from '../store/cart'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {Card, CardMedia} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 'auto'
    // minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  image: {
    height: '35rem',
    width: '35rem',
    marginBottom: '.5rem'
  },
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '150vh',
    width: '60%',
    backgroundColor: '#ffce0766'
  },
  cardHolder: {
    display: 'flex',
    margin: '1rem',
    justifyContent: 'center'
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  infoContainer: {
    marginLeft: '10rem',
    marginRight: '10rem'
  }
}))

const Product = props => {
  const classes = useStyles()
  const [quantity, setQuantity] = useState(1)
  const {load, products, fetchCart, cart, addItem, updateItem} = props
  const product = products.find(prod => prod.id === props.match.params.id)
  useEffect(() => {
    load()
    fetchCart()
  }, [])
  return product ? (
    <div className={classes.cardHolder}>
      <Card className={classes.cardStyle}>
        <h3
          style={{
            textAlign: 'center'
          }}
        >
          {product.name}
        </h3>
        <div className={classes.imgContainer}>
          <Link to={`/products/${product.id}`}>
            <img
              className={classes.image}
              src={product.imageUrl}
              title={product.name}
            />
          </Link>
        </div>

        <div className={classes.infoContainer}>
          <h3>Description:</h3> {product.description}
          <h4>Part Number:</h4> {product.partNumber}
          <h4>Weight:</h4> {product.weight} lbs
          <h4>Brand:</h4> {product.brand}
          <h4>Length:</h4> {product.length} in
          <h4>Price:</h4> ${product.price}
        </div>
        <FormControl className={classes.formControl}>
          <label>
            Quantity:
            <Select
              defaultValue={1}
              onChange={ev => {
                setQuantity(ev.target.value)
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
            </Select>
          </label>

          <Button
            onClick={() => {
              const item = cart.products.find(prod => prod.id === product.id)
              if (item) {
                updateItem(product, quantity)
              } else {
                addItem(product, quantity)
              }
            }}
            variant="contained"
            color="primary"
          >
            Add to cart
          </Button>
        </FormControl>
      </Card>
    </div>
  ) : null
}

const mapState = ({products, cart}) => ({
  products,
  cart
})

const mapDispatch = dispatch => {
  return {
    load: () => dispatch(loadProducts()),
    addItem: (product, qty) => dispatch(addToCart(product, qty)),
    fetchCart: () => dispatch(loadCart()),
    updateItem: (product, quantity) => dispatch(updateCart(product, quantity))
  }
}

export default connect(mapState, mapDispatch)(Product)
