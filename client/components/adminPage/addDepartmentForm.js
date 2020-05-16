import React, {useState, useRef} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {addDepartment} from '../../store/departments'

const _AddDepartmentForm = ({departments, addDept}) => {
  const [name, setName] = useState('')

  const [showImage, setShowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState('Uploading...')

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
    setShowProgress(false)
    setShowImage(false)
    addDept({name, imageUrl})
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
