import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/allProducts'

const _AddProductForm = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setItemURL] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    addProduct(name, price, stock, description, imageURL)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          placeholder="Amount of stock"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          placeholder="ImageURL (for now)"
          value={imageURL}
          onChange={e => setItemURL(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct({name, price, stock, description, imageURL}) {
      return dispatch(addProduct({name, price, stock, description, imageURL}))
    }
  }
}

export const AddProductForm = connect(null, mapDispatchToProps)(_AddProductForm)
