import React, { useState } from 'react'
import { useRecipeStore } from '../store/recipeStore'

const EditRecipeForm = ({ existing }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(existing.title)
  const [description, setDescription] = useState(existing.description)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateRecipe({ id: existing.id, title: title.trim(), description: description.trim() })
    setEditing(false)
  }

  if (!editing) return <button onClick={() => setEditing(true)}>Edit</button>

  return (
    <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditing(false)}>Cancel</button>
    </form>
  )
}

export default EditRecipeForm
