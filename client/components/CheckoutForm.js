import React, {useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios'
import {Confirmation} from './confirmation'
export const CheckoutForm = ({total}) => {
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [line1, setLine1] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

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
        <input
          type="text"
          name="name"
          onChange={ev => handleChange(ev.target.name, ev.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          onChange={ev => handleChange(ev.target.name, ev.target.value)}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="line1"
          onChange={ev => handleChange(ev.target.name, ev.target.value)}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          onChange={ev => handleChange(ev.target.name, ev.target.value)}
        />
      </label>
      <label>
        State:
        <input
          type="text"
          name="state"
          onChange={ev => handleChange(ev.target.name, ev.target.value)}
        />
      </label>
      <label>
        Zip:
        <input
          type="text"
          name="zip"
          onChange={ev => handleChange(ev.target.name, ev.target.value)}
        />
      </label>
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
