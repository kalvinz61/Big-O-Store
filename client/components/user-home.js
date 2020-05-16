import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './allProducts'
import {loadProducts, loadFilteredProducts} from '../store/allProducts'
import {loadCart} from '../store/cart'
import SearchBar from './searchBar/searchBar'
import FilterBar from './filterBar/filterBar'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const location = useLocation()
  const {email, loadProds, loadCrt, loadFiltered} = props
  console.log('MATCH', props)
  useEffect(
    () => {
      if (props.match.path.includes('/products')) {
        loadFiltered(props.match.params.type, props.match.params.name)
      } else {
        loadProds()
      }
      loadCrt()
    },
    [location]
  )
  return (
    <div>
      {/* <SearchBar /> */}
      <FilterBar />
      <AllProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.email,
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
    },
    loadFiltered: (type, name) => {
      dispatch(loadFilteredProducts(type, name))
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
