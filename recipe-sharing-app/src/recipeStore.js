import { create } from 'zustand'

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  favorites: [],

  setRecipes: (recipes) => set({ recipes }),
  addRecipe: (recipe) => set((s) => ({ recipes: [...s.recipes, recipe] })),
  updateRecipe: (updated) => set((s) => ({ recipes: s.recipes.map(r => r.id === updated.id ? updated : r) })),
  deleteRecipe: (id) => set((s) => ({ recipes: s.recipes.filter(r => r.id !== id), favorites: s.favorites.filter(fid => fid !== id) })),

  setSearchTerm: (term) => set({ searchTerm: term }),

  addFavorite: (id) => set((s) => ({ favorites: Array.from(new Set([...s.favorites, id])) })),
  removeFavorite: (id) => set((s) => ({ favorites: s.favorites.filter(fid => fid !== id) })),

  getFiltered: () => {
    const { recipes, searchTerm } = get()
    const q = (searchTerm || '').trim().toLowerCase()
    if (!q) return recipes
    return recipes.filter(r => (r.title || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q))
  }
}))

export default useRecipeStore
