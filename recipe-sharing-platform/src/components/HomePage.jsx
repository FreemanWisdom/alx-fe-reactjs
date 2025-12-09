import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // Load base data and merge any locally saved recipes (from AddRecipeForm)
    Promise.all([
      fetch('/src/data.json').then(res => res.json()).catch(() => []),
    ])
      .then(([base]) => {
        const saved = JSON.parse(localStorage.getItem('recipes') || 'null')
        // saved recipes are stored with newest first in AddRecipeForm
        const merged = Array.isArray(saved) ? saved.concat(base) : base
        setRecipes(merged)
      })
      .catch(err => console.error('Failed to load recipes', err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Recipe Sharing Platform</h1>
          <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Recipe</Link>
        </header>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map(r => (
            <article key={r.id} className="bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition p-4">
              <img src={r.image} alt={r.title} className="w-full h-40 object-cover rounded" />
              <h2 className="mt-3 text-xl font-semibold text-gray-800">{r.title}</h2>
              <p className="text-gray-600 mt-2">{r.summary}</p>
              <div className="mt-4">
                <Link to={`/recipe/${r.id}`} className="text-blue-600 hover:underline">View Recipe</Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default HomePage
