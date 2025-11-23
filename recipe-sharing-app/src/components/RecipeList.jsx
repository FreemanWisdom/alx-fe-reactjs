import { Link } from 'react-router-dom'
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)

  const q = (searchTerm || '').trim().toLowerCase()
  const filtered = !q ? recipes : recipes.filter(r => (r.title || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q))

  if (!filtered || filtered.length === 0) return <div>No recipes yet.</div>

  return (
    <div>
      {filtered.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <h3><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  )
}

export default RecipeList;
