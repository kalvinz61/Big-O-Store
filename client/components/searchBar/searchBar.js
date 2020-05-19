import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {SearchBarResultCard} from './searchBarLi'

import {loadSearchedProducts, loadProducts} from '../../store/allProducts'

const _SearchBar = props => {
  const [inputText, setInputText] = useState('')
  // let inputText = ''
  const [productLis, setProductLis] = useState([])
  const [backArrow, setBackArrow] = useState(false)

  useEffect(
    () => {
      if (!inputText.length) {
        setProductLis([])
      } else {
        props
          .loadFiltered(inputText, false) //call api without dispatching to store by setting to false
          .then(matches => setProductLis(matches.slice(0, 7)))
      }
    },
    [inputText]
  )

  async function handleChange(e) {
    e.preventDefault()
    console.log('EVENT', e.target.value)
    await setInputText(e.target.value)
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!inputText.length) return null
    await props.loadFiltered(inputText, true) //call api dispatching to store
    // inputText = ''
    setInputText('')
    setBackArrow(true)
  }

  function handleBack() {
    setBackArrow(false)
    props.loadAll()
  }
  return (
    <div>
      <form onSubmit={handleSearch}>
        {/* <label>Search our Products</label> */}
        <div className="searchbar-input-button-container">
          {backArrow && (
            <Button type="button" className="back-button" onClick={handleBack}>
              Clear search
            </Button>
          )}
          <input
            value={inputText}
            type="text"
            placeholder="Search product"
            onChange={ev => handleChange(ev)}
          />
          <Button type="submit" disabled={!(productLis.length > 0)}>
            Search
          </Button>
        </div>
        {inputText.length > 0 &&
        Array.isArray(productLis) &&
        productLis.length > 0 ? (
          <div className="searchbar-results-container">
            {productLis.map(product => (
              <SearchBarResultCard
                key={product.id}
                product={product}
                setText={setInputText}
              />
            ))}
            {inputText.length > 0 && !productLis.length ? (
              <div className="no-results">No results for this search</div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loadFiltered(filter, search) {
      return dispatch(loadSearchedProducts(filter, search))
    },
    loadAll() {
      return dispatch(loadProducts())
    }
  }
}

export default connect(null, mapDispatchToProps)(_SearchBar)
