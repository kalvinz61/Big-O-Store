import React, {useEffect} from 'react'
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
  const {email, loadProds, loadCrt, loadFiltered} = props
  console.log('MATCH', props.match)
  useEffect(() => {
    if (props.match.path === '/products/:type/:name') {
      loadFiltered(props.match.params.type, props.match.params.name)
    } else {
      loadProds()
    }
    loadCrt()
  }, [])
  return (
    <div>
      <SearchBar />
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
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    loadProds: () => {
      dispatch(loadProducts())
    },
    loadCrt: () => {
      console.log('loading cart')
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
