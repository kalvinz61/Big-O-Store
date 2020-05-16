import React, {useState, useRef} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {addDepartment} from '../../store/departments'

const _AddDepartmentForm = ({departments, addDept, setShow}) => {
  const [name, setName] = useState('')

  const [showImage, setShowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState('Uploading...')

  const [error, setError] = useState('')

  const el = useRef()

  async function handleChange(e) {
    setShowProgress(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    const location = (await axios.post('/api/s3/image', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })).data.location
    setProgress('Completed upload')
    setShowImage(true)
    setImageUrl(location)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !imageUrl) {
      setError('Missing fields')
      setTimeout(() => setError(''), 3000)
      return null
    }
    setShowProgress(false)
    setShowImage(false)
    addDept({name, imageUrl})
    setShow(false)
  }

  return (
    <form onSubmit={handleSubmit} className="add-department-form">
      <h3>Add a department</h3>
      <input
        value={name}
        placeholder="Name"
        onChange={ev => setName(ev.target.value)}
      />
      <input type="file" ref={el} onChange={e => handleChange(e)} />
      {showProgress && <div>{progress}</div>}
      {showImage && <img src={imageUrl} />}
      {error && <div className="submit-error">{error}</div>}
      <button
        disabled={
          !!(
            showProgress &&
            progress === 'Uploading...' &&
            !departments.find(d => d.name === name)
          )
        }
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    departments: state.departments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDept(data) {
      return dispatch(addDepartment(data))
    }
  }
}

export const AddDepartmentForm = connect(mapStateToProps, mapDispatchToProps)(
  _AddDepartmentForm
)
