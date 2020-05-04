import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './allProducts'
import {loadProducts} from '../store/allProducts'

/**
 * COMPONENT
 */
export const Home = props => {
  const {email, load} = props

  useEffect(() => {
    load()
  })
  return (
    <div>
      <h3>Welcome, {email}</h3>
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
    load: () => {
      dispatch(loadProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string
}
