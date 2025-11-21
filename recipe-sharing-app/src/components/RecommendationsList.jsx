import React, { useEffect } from 'react'
import { useRecipeStore } from '../store/recipeStore'
import { Link } from 'react-router-dom'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)

  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  if (!recommendations || recommendations.length === 0) return <p>No recommendations yet.</p>

  return (
    <div>
      <h2>Recommendations</h2>
      {recommendations.map(r => (
        <div className="recipe" key={r.id}>
          <h3><Link to={`/recipes/${r.id}`}>{r.title}</Link></h3>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  )
}

export default RecommendationsList
