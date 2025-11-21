import React from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.filteredRecipes)
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)
  const favorites = useRecipeStore(state => state.favorites)

  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>

  return (
    <div>
      {recipes.map(recipe => (
        <div className="recipe" key={recipe.id}>
          <h3><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></h3>
          <p>{recipe.description}</p>
          <div className="controls small">
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
            {' '}
            {favorites.includes(recipe.id) ? (
              <button onClick={() => removeFavorite(recipe.id)}>Unfavorite</button>
            ) : (
              <button onClick={() => addFavorite(recipe.id)}>Favorite</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeList
