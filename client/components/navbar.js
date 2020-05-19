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
import {SearchBar} from '.'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddToQueueIcon from '@material-ui/icons/AddToQueue'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
    // '& > *': {
    //   margin: theme.spacing(1)
    // }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="fixed" top="0">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit">
              <Link to="/home">
                <img src="/logos/Automania.png" style={{height: 60}} />
              </Link>
            </Button>
          </Typography>
          <SearchBar />
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button aria-label="add to shopping cart" color="inherit">
                <Link to="/home">
                  <HomeIcon style={{fontSize: 30}} />
                  <br />
                  <span style={{fontSize: 13}}>HOME</span>
                </Link>
              </Button>
              <Button aria-label="add to shopping cart" color="inherit">
                <Link to="/cart">
                  <ShoppingCartIcon style={{fontSize: 30}} />
                  <br />
                  <span style={{fontSize: 13}}>CART</span>
                </Link>
              </Button>
              <Button aria-label="add to shopping cart" color="inherit">
                <Link to="#" onClick={handleClick}>
                  <ExitToAppIcon style={{fontSize: 30}} />
                  <br />
                  <span style={{fontSize: 13}}>LOGOUT</span>
                </Link>
              </Button>
              <Button aria-label="add to shopping cart" color="inherit">
                <Link to="/account">
                  <SupervisorAccountIcon style={{fontSize: 30}} />
                  <br />
                  <span style={{fontSize: 13}}>ACCOUNT</span>
                </Link>
              </Button>
              {isAdmin && (
                <Button aria-label="add to shopping cart" color="inherit">
                  <Link to="/admin">
                    <SupervisorAccountIcon style={{fontSize: 30}} />
                    <br />
                    <span style={{fontSize: 13}}>ADMIN</span>
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button aria-label="add to shopping cart" color="inherit">
                <Link to="/login">
                  <AccountCircleIcon style={{fontSize: 40}} />
                  <br />
                  <span style={{fontSize: 17}}>LOGIN</span>
                </Link>
              </Button>
              <Button aria-label="add to shopping cart" color="inherit">
                <Link to="/signup">
                  <AddToQueueIcon style={{fontSize: 40}} />
                  <br />
                  <span style={{fontSize: 17}}>SIGNUP</span>
                </Link>
              </Button>
              <Button aria-label="add to shopping cart" color="inherit">
                <Link to="/cart">
                  <ShoppingCartIcon style={{fontSize: 40}} />
                  <br />
                  <span style={{fontSize: 17}}>CART</span>
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
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
    isAdmin: !!state.user.isAdmin,
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
