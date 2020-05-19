import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

export const Confirmation = () => {
  return (
    <div>
      <hr />
      Go buy more stuff!
      <Button color="inherit">
        <Link to="/home">Home</Link>
      </Button>
      <hr />
    </div>
  )
}
