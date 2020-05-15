import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './allProducts'
import {loadProducts} from '../store/allProducts'
import {loadCart} from '../store/cart'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, loadProds, loadCrt} = props

  useEffect(() => {
    loadProds()
    loadCrt()
  }, [])
  return (
    <div>
      <AllProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    loadProds: () => {
      dispatch(loadProducts())
    },
    loadCrt: () => {
      dispatch(loadCart())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
