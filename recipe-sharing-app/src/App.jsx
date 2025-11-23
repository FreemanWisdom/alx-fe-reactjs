import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import ErrorBoundary from './components/ErrorBoundary'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // quick smoke log so it's easy to see in devtools that React rendered
    // (also useful if the page appears blank)
    // eslint-disable-next-line no-console
    console.log('App rendered')
  }, [])
  return (
    <div className="App">
      <header>
        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>
      </header>
      <main>
        <ErrorBoundary>
          <SearchBar />
          <Routes>
            <Route path="/" element={<>
              <AddRecipeForm />
              <RecipeList />
              <RecommendationsList />
            </>} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
            <Route path="/favorites" element={<FavoritesList />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
