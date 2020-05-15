import React from 'react'

import {Navbar, SearchBar, FilterBar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <SearchBar />
      <FilterBar /> */}
      <Routes />
    </div>
  )
}

export default App
