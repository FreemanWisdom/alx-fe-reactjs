import create from 'zustand'

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  favorites: [],

  updateRecipe: (updatedRecipe) =>
  set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
  })),

deleteRecipe: (id) =>
  set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
  })),

  setRecipes: (recipes) => set({ recipes }),
  addRecipe: (recipe) => set(state => ({ recipes: [...state.recipes, recipe] })),
  updateRecipe: (updated) => set(state => ({ recipes: state.recipes.map(r => r.id === updated.id ? updated : r) })),
  deleteRecipe: (id) => set(state => ({ recipes: state.recipes.filter(r => r.id !== id), favorites: state.favorites.filter(fid => fid !== id) })),

  setSearchTerm: (term) => set({ searchTerm: term }),

  addFavorite: (id) => set(state => ({ favorites: Array.from(new Set([...state.favorites, id])) })),
  removeFavorite: (id) => set(state => ({ favorites: state.favorites.filter(fid => fid !== id) })),

  getFiltered: () => {
    const { recipes, searchTerm } = get()
    const q = (searchTerm || '').trim().toLowerCase()
    if (!q) return recipes
    return recipes.filter(r => (r.title || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q))
  }
}))
