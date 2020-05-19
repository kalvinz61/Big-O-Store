import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {loadCategories} from '../../store/categories'
import {loadDepartments} from '../../store/departments'

import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import {Button} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'black'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: 'white'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}))
const _FilterBar = props => {
  const [showCategories, setShowCategories] = useState(false)
  const [showDepartments, setShowDepartments] = useState(false)
  const {departments, categories, loadAll} = props
  const classes = useStyles()

  function handleShowCategoryClick() {
    if (showDepartments) setShowDepartments(false)
    setShowCategories(!showCategories)
  }
  function handleShowDepartmentClick() {
    if (showCategories) setShowCategories(false)
    setShowDepartments(!showDepartments)
  }

  useEffect(() => {
    loadAll()
  }, [])

  return (
    <div className="filter-bar-main">
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowCategoryClick}
      >
        Categories
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowDepartmentClick}
      >
        Departments
      </Button>
      {showCategories && (
        <div className="categories-filter-container">
          <GridList className={classes.gridList} cols={categories.length}>
            {categories.map(category => {
              return (
                <GridListTile key={category.id}>
                  <img src={category.imageUrl} alt={category.name} />
                  <GridListTileBar
                    title={category.name}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton aria-label={`star ${category.name}`}>
                        <a
                          key={category.id}
                          href={`/products/category/${category.name.toLowerCase()}`}
                        >
                          <ArrowRightIcon className={classes.title} />
                        </a>
                      </IconButton>
                    }
                  />
                </GridListTile>
              )
            })}
          </GridList>
        </div>
      )}
      {showDepartments && (
        <div className="categories-filter-container">
          <GridList className={classes.gridList} cols={departments.length}>
            {departments.map(department => {
              return (
                <GridListTile key={department.id}>
                  <GridListTileBar
                    title={department.name}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton aria-label={`star ${department.name}`}>
                        <a
                          key={department.id}
                          href={`/products/department/${department.name.toLowerCase()}`}
                        >
                          <ArrowRightIcon className={classes.title} />
                        </a>
                      </IconButton>
                    }
                  />
                </GridListTile>
              )
            })}
          </GridList>
        </div>
      )}
    </div>
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
    loadAll() {
      dispatch(loadCategories())
      dispatch(loadDepartments())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_FilterBar)
