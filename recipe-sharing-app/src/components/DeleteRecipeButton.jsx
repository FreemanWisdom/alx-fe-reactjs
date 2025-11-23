import { useNavigate } from 'react-router-dom'
import { useRecipeStore } from '../recipeStore'

const DeleteRecipeButton = ({ id, className, style }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm('Delete this recipe? This action cannot be undone.')) {
      deleteRecipe(id)
      navigate('/')
    }
  }

  return (
    <button onClick={handleDelete} className={className} style={style}>
      Delete
    </button>
  )
}

export default DeleteRecipeButton
