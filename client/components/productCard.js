import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {Card, CardMedia} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 'auto',
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  image: {
    height: 300,
    marginBottom: '.5rem'
  },
  cardStyle: {
    margin: '1.5rem',
    width: '25vw',
    height: '55vh',
    backgroundColor: '#ffb647'
  }
}))

const ProductCard = product => {
  const classes = useStyles()
  const [quantity, setQuantity] = useState(1)
  return (
    <Card className={classes.cardStyle}>
      <h3
        style={{
          textAlign: 'center'
        }}
      >
        {product.name}
      </h3>
      <Link to={`/products/${product.id}`}>
        <CardMedia
          className={classes.image}
          image={product.imageUrl}
          title={product.name}
        />{' '}
      </Link>

      <div
        style={{
          margin: '.5rem'
        }}
      >
        Price: {product.price}
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
    </Card>
  )
}

// const mapState = ({ cart }) => ({
//   cart
// })

const mapDispatch = dispatch => ({
  add: (product, qty) => dispatch(addToCart(product, qty))
})

export default connect(null, mapDispatch)(ProductCard)
