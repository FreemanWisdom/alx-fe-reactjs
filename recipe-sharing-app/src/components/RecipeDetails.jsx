import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRecipeStore } from '../recipeStore'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => state.recipes.find(r => String(r.id) === String(id)))
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)
  const favorites = useRecipeStore(state => state.favorites)

  if (!recipe) return <div>Recipe not found</div>

  const isFav = favorites.includes(recipe.id)

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <div>
        <button onClick={() => navigate(`/edit/${recipe.id}`)}>Edit</button>
        <button onClick={() => { if (isFav) removeFavorite(recipe.id); else addFavorite(recipe.id) }} style={{ marginLeft: 8 }}>
          {isFav ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
        <Link to="/" style={{ marginLeft: 8 }}>Back</Link>
      </div>
    </div>
  )
}

export default RecipeDetails
