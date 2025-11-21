import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRecipeStore } from '../store/recipeStore'
import EditRecipeForm from './EditRecipeForm'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = Number(id)
  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId))
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const favorites = useRecipeStore(state => state.favorites)
  const navigate = useNavigate()

  if (!recipe) return <p>Recipe not found.</p>

  const handleDelete = () => {
    deleteRecipe(recipeId)
    navigate('/')
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <div className="controls">
        <EditRecipeForm existing={recipe} />
        <button onClick={handleDelete}>Delete</button>
        {' '}
        {!favorites.includes(recipeId) && <button onClick={() => addFavorite(recipeId)}>Favorite</button>}
        <div className="small"><Link to="/">Back</Link></div>
      </div>
    </div>
  )
}

export default RecipeDetails
