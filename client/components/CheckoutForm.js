import React, {useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios'
import {Confirmation} from './confirmation'
// eslint-disable-next-line complexity
export const CheckoutForm = ({user, total}) => {
  const userName = user.name || null
  const userEmail = user.email || null
  console.log('USER', user)
  const splitAddress =
    user.address || user.email ? user.address.split('__') : null
  const userAddress = splitAddress ? splitAddress[0] : null
  const userCity = splitAddress ? splitAddress[1] : null
  const userState = splitAddress ? splitAddress[2] : null
  const userZipCode = splitAddress ? splitAddress[3] : null
  const userCountry = splitAddress ? splitAddress[4] : null

  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState('')
  const [name, setName] = useState(userName || '')
  const [email, setEmail] = useState(userEmail || '')
  const [line1, setLine1] = useState(userAddress || '')
  const [city, setCity] = useState(userCity || '')
  const [state, setState] = useState(userState || '')
  const [zip, setZip] = useState(userZipCode || '')
  const [country, setCountry] = useState(userCountry || '')

  const stripe = useStripe()
  const elements = useElements()

  const handleChange = (input, value) => {
    switch (input) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'line1':
        setLine1(value)
        break
      case 'city':
        setCity(value)
        break
      case 'state':
        setState(value)
        break
      case 'zip':
        setZip(value)
        break
      case 'country':
        setCountry(value)
        break
      default:
        return null
    }
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    setProcessing(true)
    const clientSecret = (await axios.post('/api/stripe/checkout', {
      amount: total
    })).data

    const cardElement = elements.getElement(CardElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {name, email, address: {city, line1}}
    })

    if (!error) {
      console.log('payment method created sucessfully')
    } else {
      console.log(error)
    }
    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id
    })
    console.log('confirmed', confirmedCardPayment.paymentIntent.status)
    if (confirmedCardPayment.paymentIntent.status === 'succeeded') {
      setStatus('success')
    }
  }
  return status === 'success' ? (
    <Confirmation />
  ) : (
    <form className="checkout" onSubmit={handleSubmit}>
      <label>
        Name:
        {name === userName ? (
          <div>
            {userName}
            <button type="button" onClick={() => setName('')}>
              Change
            </button>
          </div>
        ) : (
          <input
            type="text"
            name="name"
            onChange={ev => handleChange(ev.target.name, ev.target.value)}
          />
        )}
      </label>
      <label>
        Email:
        {email === userEmail ? (
          <div>
            {userEmail}
            <button type="button" onClick={() => setEmail('')}>
              Change
            </button>
          </div>
        ) : (
          <input
            type="text"
            name="email"
            onChange={ev => handleChange(ev.target.name, ev.target.value)}
          />
        )}
      </label>
      <div>
        <label>
          Address:
          {line1 === userAddress ? (
            <div>
              {userAddress}
              <button type="button" onClick={() => setLine1('')}>
                Change
              </button>
            </div>
          ) : (
            <input
              type="text"
              name="line1"
              onChange={ev => handleChange(ev.target.name, ev.target.value)}
            />
          )}
        </label>
        <label>
          City:
          {city === userCity ? (
            <div>
              {userCity}
              <button type="button" onClick={() => setCity('')}>
                Change
              </button>
            </div>
          ) : (
            <input
              type="text"
              name="city"
              onChange={ev => handleChange(ev.target.name, ev.target.value)}
            />
          )}
        </label>
        <label>
          State:
          {state === userState ? (
            <div>
              {userState}
              <button type="button" onClick={() => setState('')}>
                Change
              </button>
            </div>
          ) : (
            <input
              type="text"
              name="state"
              onChange={ev => handleChange(ev.target.name, ev.target.value)}
            />
          )}
        </label>
        <label>
          Zip:
          {zip === userZipCode ? (
            <div>
              {userZipCode}
              <button type="button" onClick={() => setZip('')}>
                Change
              </button>
            </div>
          ) : (
            <input
              type="text"
              name="zip"
              onChange={ev => handleChange(ev.target.name, ev.target.value)}
            />
          )}
        </label>
        <label>
          Country:
          {country === userCountry ? (
            <div>
              {userCountry}
              <button type="button" onClick={() => setCountry('')}>
                Change
              </button>
            </div>
          ) : (
            <input
              type="text"
              name="zip"
              onChange={ev => handleChange(ev.target.name, ev.target.value)}
            />
          )}
        </label>
      </div>
      <CardElement />
      <input
        type="submit"
        value="Checkout"
        style={{alignSelf: 'center'}}
        disabled={processing}
      />
    </form>
  )
}
