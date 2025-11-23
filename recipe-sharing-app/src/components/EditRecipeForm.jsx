import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecipeStore } from '../recipeStore'

const EditRecipeForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => state.recipes.find(r => String(r.id) === String(id)))
  const updateRecipe = useRecipeStore(state => state.updateRecipe)

  const [title, setTitle] = useState(recipe?.title || '')
  const [description, setDescription] = useState(recipe?.description || '')

  if (!recipe) return <div>Recipe not found</div>

  const handleSubmit = (event) => {
    event.preventDefault()
    updateRecipe({ ...recipe, title, description })
    navigate(`/recipes/${recipe.id}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </form>
  )
}

export default EditRecipeForm
