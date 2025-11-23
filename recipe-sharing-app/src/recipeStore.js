import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  // --- TASK 0: Initial recipes ---
  recipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),

  // --- TASK 1: Edit/Delete ---
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  // --- TASK 2: Search/Filter ---
  searchTerm: '',
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },
  filteredRecipes: [],
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((r) =>
        r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // --- TASK 3: Favorites/Recommendations ---
  favorites: [],
  addFavorite: (id) =>
    set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f !== id),
    })),

  recommendations: [],
  generateRecommendations: () =>
    set((state) => ({
      // mock recommendation logic: random recipe from favorites
      recommendations: state.recipes.filter(
        (r) => state.favorites.includes(r.id) && Math.random() > 0.5
      ),
    })),
}));
