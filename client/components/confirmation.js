import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const Confirmation = props => {
  const classes = useStyles()
  const {load} = props
  useEffect(() => {
    load()
  }, [])
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

const mapDispatch = dispatch => ({
  load: () => dispatch(loadOrder())
})

export default connect(null, mapDispatch)(Confirmation)
