import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Cart,
  Product,
  AdminPage,
  Checkout,
  Confirmation,
  AccountPage
} from './components'
import {me} from './store'
import {retrieveGuestSession, createGuestSession} from './store/user'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    const {loadInitialGuest, loadInitialData, retrieveGuest} = this.props

    const guestID = window.localStorage.getItem('guestID')
    if (!guestID || guestID === 'undefined') {
      await loadInitialGuest()
    } else {
      await retrieveGuest(guestID)
    }
    await loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserHome} />
        <Route path="/products/:type/:name" component={UserHome} />
        <Route path="/products/:id" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirmation" component={Confirmation} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/admin" component={AdminPage} />
            <Route path="/account" component={AccountPage} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialGuest() {
      dispatch(createGuestSession())
    },
    retrieveGuest(id) {
      dispatch(retrieveGuestSession(id))
    },
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
