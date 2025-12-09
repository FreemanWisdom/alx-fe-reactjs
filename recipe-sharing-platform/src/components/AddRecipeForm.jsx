import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddRecipeForm = () => {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const validate = () => {
    const found = []
    if (!title.trim()) found.push('Title is required.')
    if (!ingredients.trim()) found.push('Ingredients are required.')
    if (!steps.trim()) found.push('Preparation steps are required.')

    const ingredientsArr = ingredients.split('\n').map(s => s.trim()).filter(Boolean)
    if (ingredientsArr.length < 2) found.push('Please provide at least two ingredients (one per line).')

    setErrors(found)
    return found.length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    setErrors([])

    if (!validate()) return

    const ingredientsArr = ingredients.split('\n').map(s => s.trim()).filter(Boolean)
    const stepsArr = steps.split('\n').map(s => s.trim()).filter(Boolean)

    // For this starter project we store new recipe in localStorage
    const saved = JSON.parse(localStorage.getItem('recipes') || 'null')
    // Try to load base data.json and merge; if not present, fall back to saved only
    fetch('/src/data.json')
      .then(res => res.json())
      .then(base => {
        const all = Array.isArray(saved) ? saved.concat(base) : base
        const nextId = Math.max(0, ...all.map(r => r.id || 0)) + 1
        const newRecipe = {
          id: nextId,
          title: title.trim(),
          summary: (stepsArr[0] || '').slice(0, 120),
          image: `https://via.placeholder.com/600x400?text=${encodeURIComponent(title)}`,
          ingredients: ingredientsArr,
          steps: stepsArr,
        }
        const updated = [newRecipe].concat(Array.isArray(saved) ? saved : [])
        localStorage.setItem('recipes', JSON.stringify(updated))
        navigate(`/recipe/${newRecipe.id}`)
      })
      .catch(() => {
        setErrors(['Failed to create recipe (could not read base data).'])
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
        {errors && errors.length > 0 && (
          <div className="mb-4 text-red-600">
            <ul className="list-disc list-inside">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full md:w-3/4 rounded border-gray-300 shadow-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients (one per line)</label>
            <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} rows={4} className="mt-1 block w-full md:w-3/4 rounded border-gray-300 shadow-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preparation Steps (one per line)</label>
            <textarea value={steps} onChange={e => setSteps(e.target.value)} rows={6} className="mt-1 block w-full md:w-3/4 rounded border-gray-300 shadow-sm" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
            <button type="button" onClick={() => navigate('/')} className="text-gray-600 hover:underline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRecipeForm
