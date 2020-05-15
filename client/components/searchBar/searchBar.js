import React, {useState} from 'react'
import {connect} from 'react-redux'

import {SearchBarResultCard} from './searchBarLi'

import {loadSearchedProducts, loadProducts} from '../../store/allProducts'

const _SearchBar = props => {
  const [inputText, setInputText] = useState('')
  const [productLis, setProductLis] = useState([])
  const [backArrow, setBackArrow] = useState(false)

  function handleChange(e) {
    e.preventDefault()
    console.log('EVENT', e.target.value)
    setInputText(e.target.value)
    if (!inputText.length) {
      setProductLis([])
    } else {
      props
        .loadFiltered(inputText, false) //call api without dispatching to store by setting to false
        .then(matches => setProductLis(matches.slice(0, 7)))
    }
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!inputText.length) return null
    await props.loadFiltered(inputText, true) //call api dispatching to store
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
            <button type="button" className="back-button" onClick={handleBack}>
              Clear search
            </button>
          )}
          <input
            value={inputText}
            type="text"
            placeholder="Search product"
            onChange={ev => handleChange(ev)}
          />
          <button type="submit" disabled={!(productLis.length > 0)}>
            Search
          </button>
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
