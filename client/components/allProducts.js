import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {addToCart} from '../store/cart'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))
const AllProducts = props => {
  const classes = useStyles()
  const [quantity, setQuantity] = useState(1)
  const {products, add} = props
  useEffect(() => {
    add()
  }, [])
  return (
    <div className="allProducts">
      {products.map(product => {
        return (
          <div key={product.id} className="listProduct">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
              <img src={product.imageUrl} />
            </Link>
            <FormControl className={classes.formControl}>
              <label>
                Quantity:
                <Select
                  style={{textAlign: 'right'}}
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
                <IconButton
                  className="addToCart"
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={() => {
                    add(product, quantity)
                  }}
                  variant="contained"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </label>
            </FormControl>
          </div>
        )
      })}
    </div>
  )
}

const mapState = ({products}) => ({
  products
})

const mapDispatch = dispatch => {
  return {
    add: (product, qty) => dispatch(addToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
