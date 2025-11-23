import { useRecipeStore } from './recipeStore'
import { Link } from 'react-router-dom'

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes)
  const favorites = useRecipeStore(state => state.favorites)
  const favRecipes = favorites.map(id => recipes.find(r => r.id === id)).filter(Boolean)

  if (!favRecipes.length) return <div><h2>My Favorites</h2><p>No favorites yet.</p></div>

  return (
    <div>
      <h2>My Favorites</h2>
      {favRecipes.map(r => (
        <div key={r.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <h3><Link to={`/recipes/${r.id}`}>{r.title}</Link></h3>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  )
}

export default FavoritesList
