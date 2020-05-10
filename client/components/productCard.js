import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
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
      <div className="listProduct">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
        <img src={product.imageUrl} />
        <div>Price: {product.price}</div>
        <FormControl className={classes.formControl}>
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
          <Button
            onClick={() => product.add(product)}
            variant="contained"
            color="primary"
          >
            Add to cart
          </Button>
        </FormControl>
      </div>
    </div>
  )
}

const mapState = ({product}) => {
  return {
    product
  }
}

const mapDispatch = dispatch => ({
  add: (product, qty) => dispatch(addToCart(product, qty))
})

export default connect(mapState, mapDispatch)(ProductCard)
