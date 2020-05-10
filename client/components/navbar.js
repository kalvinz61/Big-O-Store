import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const Navbar = ({handleClick, isLoggedIn, id, cart}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <nav>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Button color="inherit">
                <Link to="/home">
                  <h1>AUTOMANIA</h1>
                </Link>
              </Button>
            </Typography>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Button color="inherit">
                  <Link to="/home">Home</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/cart">Cart</Link>
                </Button>
                <Button color="inherit">
                  <Link to="#" onClick={handleClick}>
                    Logout
                  </Link>
                </Button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button color="inherit">
                  <Link to="/cart">Cart</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/login">Login</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </Toolbar>
          {/* <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
            <Button>Alternators and Starters</Button>
            <Button>{'Apparel & Accessories'}</Button>
            <Button>Batteries</Button>
            <Button>{`Belts & Hoses`}</Button>
            <Button>Brakes</Button>
            <Button>Drivetrain</Button>
            <Button>{`Engine Heating & Cooling`}</Button>
            <Button>{`Engines, Parts & Gaskets`}</Button>
            <Button>Exhaust</Button>
            <Button>{`Fasteners & Hardware`}</Button>
            <Button>Filters</Button>
            <Button>{`Fuel & Emission Systems`}</Button>
            <Button>{`Headlights, Vision & Safety`}</Button>
            <Button>{`Heating, Cooling & Climate Control`}</Button>
        </Toolbar> */}
        </AppBar>
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.email,
    id: state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
