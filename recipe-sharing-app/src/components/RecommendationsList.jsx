import { useRecipeStore } from './recipeStore'
import { Link } from 'react-router-dom'

const RecommendationsList = () => {
  const recipes = useRecipeStore(state => state.recipes)
  const favorites = useRecipeStore(state => state.favorites)

  // Simple recommendations: show up to 3 recipes not in favorites
  const recs = recipes.filter(r => !favorites.includes(r.id)).slice(0, 3)

  if (!recs.length) return null

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Recommended for you</h3>
      {recs.map(r => (
        <div key={r.id} style={{ padding: '6px 0' }}>
          <Link to={`/recipes/${r.id}`}>{r.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default RecommendationsList
