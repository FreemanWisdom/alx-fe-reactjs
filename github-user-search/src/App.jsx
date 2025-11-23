import './App.css'
import Search from './components/Search'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search GitHub users by username or use the advanced filters.</p>
      </header>
      <main>
        <Search />
      </main>
      <footer style={{textAlign:'center',padding:'16px',color:'#666'}}>
        Built with the GitHub API
      </footer>
    </div>
  )
}

export default App
