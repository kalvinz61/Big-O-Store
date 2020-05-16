import React, {useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../../store/allProducts'
import axios from 'axios'

import {loadCategories} from '../../store/categories'
import {loadDepartments} from '../../store/departments'

const _AddProductForm = ({loadAll, addProd, departments, categories}) => {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState('')
  const [category, setCategory] = useState('Select one..')
  const [department, setDepartment] = useState('')

  const [showImage, setShowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState('Uploading...')
  const el = useRef()

  useEffect(
    () => {
      console.log('using Effect')
      if (!categories.length || !departments.length) {
        loadAll()
      }
    },
    [
      showProgress,
      progress,
      name,
      brand,
      price,
      stock,
      description,
      rating,
      category,
      department,
      imageUrl
    ]
  )

  async function handleChange(e) {
    setShowProgress(true)
    const file = e.target.files[0] // accessing file
    const formData = new FormData()
    formData.append('product_image', file)
    const location = (await axios.post('/api/s3/product_image', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })).data.location
    setProgress('Completed upload')
    setShowImage(true)
    setImageUrl(location)
  }
  console.log('CAT AND DEPT', category, department)
  function handleSubmit(e) {
    e.preventDefault()
    setShowProgress(false)
    setShowImage(false)
    addProd(
      name,
      brand,
      Number(price),
      Number(stock),
      description,
      Number(rating),
      category,
      department,
      imageUrl
    )
    setProgress('Uploading...')
  }

  return (
    <form onSubmit={handleSubmit} className="add-prod-form">
      <input
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Brand"
        value={brand}
        onChange={e => setBrand(e.target.value)}
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
        className="add-prod-description-input"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        placeholder="Rating"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Select one..</option>
        {categories.map(c => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <select value={department} onChange={e => setDepartment(e.target.value)}>
        <option>Select one..</option>
        {departments.map(d => (
          <option key={d.id} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>
      <input type="file" ref={el} onChange={e => handleChange(e)} />
      {showProgress && <div>{progress}</div>}
      {showImage && <img src={imageUrl} />}
      <button
        disabled={!!(showProgress && progress === 'Uploading...')}
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    departments: state.departments,
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProd(
      name,
      brand,
      price,
      stock,
      description,
      rating,
      category,
      department,
      imageURL
    ) {
      return dispatch(
        addProduct({
          name,
          brand,
          price,
          stock,
          description,
          rating,
          category,
          department,
          imageURL
        })
      )
    },
    loadAll() {
      dispatch(loadCategories())
      dispatch(loadDepartments())
    }
  }
}

export const AddProductForm = connect(mapStateToProps, mapDispatchToProps)(
  _AddProductForm
)
