import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {me, updateUserAddress} from '../../store/user'

// view and change user info (name, email, password)
// change delivery addresses
// view orders
// change payment options

const _AccountPage = ({user, getMe, updateAddress}) => {
  const [makeChanges, setMakeChanges] = useState(false)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const [error, setError] = useState('')
  useEffect(() => {
    if (!user.id) {
      getMe()
    }
  }, [])

  function handleAddressSubmit(ev) {
    if (!address || !city || !state || !zip || !country) {
      setError('Missing fields')
    }
    ev.preventDefault()
    updateAddress({address, city, state, zip, country})
    setShowAddressForm(false)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 4000)
  }

  // console.log([address, city, state, zip, country])

  return (
    <div>
      <h2>Account management</h2>

      <div>
        <h1>Manage account for: {user.email}</h1>
        <div>
          <h2>Personal Info</h2>
          <div>
            Name: <span>{user.name}</span>
          </div>
          <div>
            Email: <span>{user.email}</span>
          </div>
          <a>Reset password</a>
        </div>
        <div>
          <h2>Addresses</h2>
          <div>
            Main Address: {user.address && user.address.split('__').join(', ')}
            <button type="button" onClick={() => setShowAddressForm(true)}>
              Update
            </button>
          </div>
          {showSuccessMessage && <div>Address updated!</div>}
          {showAddressForm && (
            <form>
              <label>
                Address:
                <input
                  type="text"
                  name="line1"
                  onChange={ev => setAddress(ev.target.value)}
                />
              </label>
              <label>
                City
                <input
                  type="text"
                  name="city"
                  onChange={ev => setCity(ev.target.value)}
                />
              </label>
              <label>
                State:
                <input
                  type="text"
                  name="state"
                  onChange={ev => setState(ev.target.value)}
                />
              </label>
              <label>
                Zip
                <input
                  type="text"
                  name="zip"
                  onChange={ev => setZip(ev.target.value)}
                />
              </label>
              <label>
                Country
                <input
                  type="text"
                  name="country"
                  onChange={ev => setCountry(ev.target.value)}
                />
              </label>
              <button type="button" onClick={() => setShowAddressForm(false)}>
                Cancel
              </button>
              <button type="button" onClick={ev => handleAddressSubmit(ev)}>
                Submit
              </button>
              {error && <div className="submit-error">{error}</div>}
            </form>
          )}
        </div>
      </div>
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
    },
    updateAddress(data) {
      return dispatch(updateUserAddress(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_AccountPage)
