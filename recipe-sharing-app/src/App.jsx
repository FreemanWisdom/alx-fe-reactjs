import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import SearchBar from './components/SearchBar'
import { useRecipeStore } from './store/recipeStore'

export default function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes)

  // seed some sample data on first load
  useEffect(() => {
    setRecipes([
      { id: 1, title: 'Spaghetti Carbonara', description: 'Classic Italian pasta with eggs, cheese, pancetta.' },
      { id: 2, title: 'Avocado Toast', description: 'Toasted bread topped with smashed avocado and olive oil.' },
      { id: 3, title: 'Pancakes', description: 'Fluffy pancakes with maple syrup.' }
    ])
  }, [setRecipes])

  return (
    <div className="app">
      <header>
        <h1><Link to="/">Recipe Sharing App</Link></h1>
        <nav>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/favorites">Favorites</Link>
        </nav>
      </header>
      <main>
        <SearchBar />
        <Routes>
          <Route path="/" element={(
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          )} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<><FavoritesList /><RecommendationsList /></>} />
        </Routes>
      </main>
    </div>
  )
}
