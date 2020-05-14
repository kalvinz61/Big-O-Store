import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
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
                  add(product, quantity)
                }}
                variant="contained"
                color="primary"
              >
                Add to cart
              </Button>
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
