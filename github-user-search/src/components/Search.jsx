import { useState } from 'react'
import { fetchUserData, searchUsers } from '../services/githubService'
import './Search.css'

export default function Search() {
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [mode, setMode] = useState('single') // 'single' or 'advanced'

  async function handleSingleSearch(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setUser(null)
    try {
      const data = await fetchUserData(username.trim())
      setUser(data)
    } catch (err) {
      setError('Looks like we cant find the user')
    } finally {
      setLoading(false)
    }
  }

  async function handleAdvancedSearch(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults([])
    setPage(1)
    try {
      const q = username.trim() || ''
      const res = await searchUsers({ q, location: location.trim(), repos: minRepos ? Number(minRepos) : undefined, page: 1, per_page: 10 })
      setResults(res.items || [])
      setTotalCount(res.total_count || 0)
    } catch (err) {
      setError('Looks like we cant find any users with those criteria')
    } finally {
      setLoading(false)
    }
  }

  async function loadMore() {
    const next = page + 1
    setLoading(true)
    try {
      const q = username.trim() || ''
      const res = await searchUsers({ q, location: location.trim(), repos: minRepos ? Number(minRepos) : undefined, page: next, per_page: 10 })
      setResults((s) => [...s, ...(res.items || [])])
      setPage(next)
    } catch (err) {
      setError('Unable to load more results')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-root">
      <div className="mode-toggle">
        <label>
          <input type="radio" name="mode" checked={mode === 'single'} onChange={() => setMode('single')} /> Single user
        </label>
        <label>
          <input type="radio" name="mode" checked={mode === 'advanced'} onChange={() => setMode('advanced')} /> Advanced
        </label>
      </div>

      {mode === 'single' ? (
        <form className="search-form" onSubmit={handleSingleSearch}>
          <input placeholder="Enter GitHub username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button type="submit" disabled={loading}>Search</button>
        </form>
      ) : (
        <form className="search-form" onSubmit={handleAdvancedSearch}>
          <input placeholder="Name or login (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Location (optional)" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input type="number" min="0" placeholder="Min repos (optional)" value={minRepos} onChange={(e) => setMinRepos(e.target.value)} />
          <button type="submit" disabled={loading}>Search</button>
        </form>
      )}

      <div className="status">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
      </div>

      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt="avatar" />
          <div>
            <h3>{user.name || user.login}</h3>
            <p>{user.location}</p>
            <p>Repos: {user.public_repos}</p>
            <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
          </div>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="results">
          <h3>Results ({totalCount})</h3>
          {results.map((r) => (
            <div className="result-item" key={r.id}>
              <img src={r.avatar_url} alt="avatar" />
              <div>
                <a href={r.html_url} target="_blank" rel="noreferrer">{r.login}</a>
              </div>
            </div>
          ))}
          {results.length < totalCount && (
            <button onClick={loadMore} disabled={loading} className="load-more">Load more</button>
          )}
        </div>
      )}
    </div>
  )
}
