import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {me} from '../../store/user'

// view and change user info (name, email, password)
// change delivery addresses
// view orders
// change payment options

const _AccountPage = ({user, getMe}) => {
  useEffect(() => {
    if (!user.id) {
      getMe()
    }
  }, [])

  return (
    <div>
      <h2>Account management</h2>
      <div>
        <span>E-mail: {user.email}</span>
      </div>
      <button type="button">Change password</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMe() {
      return dispatch(me())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_AccountPage)
