import React from 'react'
import { useRecipeStore } from '../store/recipeStore'

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm)

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input type="text" placeholder="Search recipes..." onChange={e => setSearchTerm(e.target.value)} />
    </div>
  )
}

export default SearchBar
