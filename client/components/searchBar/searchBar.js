import React, {useState} from 'react'
import {connect} from 'react-redux'

import {SearchBarLi} from './searchBarLi'

// import { loadFilteredLis } from './functions'

import {loadFilteredProducts, loadProducts} from '../../store/allProducts'

const _SearchBar = props => {
  const [inputText, setInputText] = useState('')
  const [productLis, setProductLis] = useState([])
  const [backArrow, setBackArrow] = useState(false)

  function handleChange(e) {
    e.preventDefault()
    setInputText(e.target.value)
    if (!inputText.length) {
      setProductLis([])
    } else {
      props
        .loadFiltered(inputText, false)
        .then(matches => setProductLis(matches.slice(0, 7))) //call api without dispatching to store
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
        <label>Search our Products</label>
        <div className="searchbar-input-button-container">
          {backArrow && (
            <button
              type="button"
              className="search-go-back"
              onClick={handleBack}
            >
              Clear search
            </button>
          )}
          <input
            value={inputText}
            type="text"
            placeholder="Enter product name"
            onChange={ev => {
              return handleChange(ev)
            }}
          />
          <button type="submit" disabled={!(productLis.length > 0)}>
            Search
          </button>
        </div>
        {inputText.length > 0 &&
        Array.isArray(productLis) &&
        productLis.length > 0 ? (
          <ul className="searchbar-results-ul">
            {productLis.map(product => (
              <SearchBarLi
                key={product.id}
                product={product}
                setText={setInputText}
              />
            ))}
          </ul>
        ) : (
          ''
        )}
        {inputText.length > 0 && !productLis.length ? (
          <li>No results for this search</li>
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
      return dispatch(loadFilteredProducts(filter, search))
    },
    loadAll() {
      return dispatch(loadProducts())
    }
  }
}

export default connect(null, mapDispatchToProps)(_SearchBar)
