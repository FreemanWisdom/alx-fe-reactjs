import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    fetch('/src/data.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => String(item.id) === String(id))
        setRecipe(found)
      })
      .catch(err => console.error('Failed to load recipe', err))
  }, [id])

  if (!recipe) return (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <Link to="/" className="text-blue-600 hover:underline">&larr; Back</Link>
        <h1 className="text-2xl font-bold mt-4">{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mt-4" />

        <section className="mt-6">
          <h3 className="text-lg font-semibold">Ingredients</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </section>

        <section id="instructions" className="mt-6">
          <h3 className="text-lg font-semibold">Instructions</h3>
          <ol className="list-decimal list-inside mt-2 text-gray-700 space-y-2">
            {recipe.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}

export default RecipeDetail
