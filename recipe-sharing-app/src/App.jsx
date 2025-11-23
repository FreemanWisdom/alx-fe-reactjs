import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import ErrorBoundary from './components/ErrorBoundary'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // quick smoke log so it's easy to see in devtools that React rendered
    // (also useful if the page appears blank)
    // eslint-disable-next-line no-console
    console.log('App rendered')
  }, [])
  return (
    <div className="App">
      <header>
        <h1>Recipe Sharing App</h1>
      </header>
      <main>
        <ErrorBoundary>
          <AddRecipeForm />
          <RecipeList />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
