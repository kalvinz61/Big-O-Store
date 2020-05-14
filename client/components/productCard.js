import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const ProductCard = product => {
  const classes = useStyles()
  const [quantity, setQuantity] = useState(1)
  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} />
      <div>
        <h3>Description:</h3> {product.description}
      </div>
      <div>
        <h4>Price:</h4> ${product.price}
      </div>
      <div>
        <h4>Part Number:</h4> {product.partNumber}
      </div>
      <div>
        <h4>Weight:</h4> {product.weight} lbs
      </div>
      <div>
        <h4>Rating:</h4> {product.rating}
      </div>
      <div>
        <h4>Brand:</h4> {product.brand}
      </div>
      <div>
        <h4>Length:</h4> {product.length} in
      </div>
      <div>
        <h4>Color:</h4> {product.color}
      </div>
      <div>
        <h4>Category:</h4> {product.category}
      </div>
      <div>
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
            product.add(product, quantity)
          }}
          variant="contained"
          color="primary"
        >
          Add to cart
        </Button>
      </FormControl>
    </div>
  )
}

// const mapState = ({ cart }) => ({
//   cart
// })

const mapDispatch = dispatch => ({
  add: (product, qty) => dispatch(addToCart(product, qty))
})

export default connect(null, mapDispatch)(ProductCard)
