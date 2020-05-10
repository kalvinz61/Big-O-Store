// import React, { useState } from 'react'
// import { connect } from 'react-redux'
// import { loadProduct } from '../store/product'
// import Button from '@material-ui/core/Button'
// import { makeStyles } from '@material-ui/core/styles'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormControl from '@material-ui/core/FormControl'
// import Select from '@material-ui/core/Select'

// const useStyles = makeStyles(theme => ({
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2)
//     }
// }))

// const AddToCartForm = (props) => {
//     const classes = useStyles()
//     const [quantity, setQuantity] = useState(0)
//     return (
//         <FormControl className={classes.formControl}>
//             <Select
//                 defaultValue={1}
//                 onChange={ev => {
//                     setQuantity(ev.target.value)
//                 }}
//             >
//                 <MenuItem value={1}>1</MenuItem>
//                 <MenuItem value={2}>2</MenuItem>
//                 <MenuItem value={3}>3</MenuItem>
//                 <MenuItem value={4}>4</MenuItem>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={6}>6</MenuItem>
//                 <MenuItem value={7}>7</MenuItem>
//                 <MenuItem value={8}>8</MenuItem>
//                 <MenuItem value={9}>9</MenuItem>
//             </Select>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                     props.addProd(product)
//                 }}
//             >
//                 Add to cart
//         </Button>
//         </FormControl>
//     )
// }

// const mapDispatch = (dispatch) => ({
//     addProd: () => dispatch(loadProduct(id))
// })
// export default connect(null, mapDispatch(AddToCartForm))
