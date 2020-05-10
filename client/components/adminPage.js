import React, {useState} from 'react'
import {connect} from 'react-redux'

import {AdminPageUsers} from './adminPageUsers'
import {AdminPageProducts} from './adminPageProducts'

const _AdminPage = ({user, isAdmin, products}) => {
  const [page, setPage] = useState('main')

  if (!isAdmin) {
    return <div className="unauthorized-div">Forbidden. Log in as Admin.</div>
  }

  return (
    <div className="admin-page">
      <nav className="admin-nav-bar">
        <h3 onClick={() => setPage('main')}>Main</h3>
        <div className="admin-nav-bar-users" onClick={() => setPage('users')}>
          Administrate users
        </div>
        <div
          className="admin-nav-bar-products"
          onClick={() => setPage('products')}
        >
          Administrate products
        </div>
      </nav>
      {page === 'main' ? (
        <div className="admin-page-main">
          <h2>Logged in admin: {user.email}</h2>
        </div>
      ) : (
        ''
      )}
      {page === 'users' ? <AdminPageUsers /> : ''}
      {page === 'products' ? <AdminPageProducts products={products} /> : ''}
    </div>
  )
}

const mapStatetoProps = state => {
  return {
    user: state.user,
    isAdmin: !!state.user.isAdmin,
    products: state.products
  }
}

export default connect(mapStatetoProps, null)(_AdminPage)
