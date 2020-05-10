import React, {useEffect, useState, Form} from 'react'
import {connect} from 'react-redux'
import {loadProduct} from '../store/product'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {addToCart} from '../store/cart'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const Product = props => {
  const [quantity, setQuantity] = useState(1)
  const classes = useStyles()
  const {load, product} = props

  // const addProd = async (prod, qty) => {
  //   await axios.post(`/api/cartsproducts`, prod)
  // }

  useEffect(() => {
    load(props.match.params.id)
  }, [])
  return (
    <div>
      <div>{product.name}</div>
      <div>${product.price}</div>
      <div>Description: {product.description}</div>
      <img src={product.imageUrl} />
      <br />
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
          variant="contained"
          color="primary"
          onClick={() => {
            props.add(product)
          }}
        >
          Add to cart
        </Button>
      </FormControl>
    </div>
  )
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    load: id => dispatch(loadProduct(id)),
    add: (product, qty) => dispatch(addToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(Product)
