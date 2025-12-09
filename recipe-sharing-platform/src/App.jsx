import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import RecipeDetail from './components/RecipeDetail'
import AddRecipeForm from './components/AddRecipeForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-bold text-lg">Recipe Sharing</Link>
            <div>
              <Link to="/" className="mr-4 text-gray-700 hover:underline">Home</Link>
              <Link to="/add" className="text-blue-600 hover:underline">Add Recipe</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add" element={<AddRecipeForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
