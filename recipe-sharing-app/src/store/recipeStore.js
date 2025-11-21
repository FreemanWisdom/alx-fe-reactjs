import create from 'zustand'

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',
  favorites: [],
  recommendations: [],

  // basic CRUD
  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: [...state.filteredRecipes, newRecipe]
  })),
  updateRecipe: (updated) => set(state => ({
    recipes: state.recipes.map(r => r.id === updated.id ? updated : r),
    filteredRecipes: state.filteredRecipes.map(r => r.id === updated.id ? updated : r)
  })),
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(r => r.id !== id),
    filteredRecipes: state.filteredRecipes.filter(r => r.id !== id),
    favorites: state.favorites.filter(fid => fid !== id)
  })),

  // search/filter
  setSearchTerm: (term) => {
    set({ searchTerm: term })
    const { recipes } = get()
    const q = term.trim().toLowerCase()
    if (!q) {
      set({ filteredRecipes: recipes })
    } else {
      set({ filteredRecipes: recipes.filter(r => (
        r.title.toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q)
      ))})
    }
  },

  // favorites & recommendations
  addFavorite: (id) => set(state => ({ favorites: Array.from(new Set([...state.favorites, id])) })),
  removeFavorite: (id) => set(state => ({ favorites: state.favorites.filter(fid => fid !== id) })),
  generateRecommendations: () => {
    const { recipes, favorites } = get()
    // simple mock: recommend recipes that are not favorited and share at least one word with a favorite title
    const favTitles = recipes.filter(r => favorites.includes(r.id)).map(r => r.title.toLowerCase())
    const words = new Set(favTitles.flatMap(t => t.split(/\W+/)))
    const recommended = recipes.filter(r => !favorites.includes(r.id) && r.title.toLowerCase().split(/\W+/).some(w => words.has(w)))
    set({ recommendations: recommended })
  }
}))
