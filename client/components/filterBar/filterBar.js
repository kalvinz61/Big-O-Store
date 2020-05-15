import React, {useState} from 'react'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({}))

const _FilterBar = props => {
  return (
    <div className="filter-bar-container">
      <Grid container spacing={2} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(_FilterBar)
