import axios from 'axios'

const GITHUB_API = 'https://api.github.com'
const SEARCH_USERS_ENDPOINT = 'https://api.github.com/search/users?q='
const TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY

function getHeaders() {
  const headers = { Accept: 'application/vnd.github+json' }
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`
  return headers
}

export async function fetchUserData(username) {
  if (!username) throw new Error('username required')
  const url = `${GITHUB_API}/users/${encodeURIComponent(username)}`
  const res = await axios.get(url, { headers: getHeaders() })
  return res.data
}

// queryParams: { q, location, minRepos, page, per_page }
export async function searchUsers({ q, location, minRepos, repos, page = 1, per_page = 30 }) {
  // Build q string for the Search API
  // Accepts either `minRepos` (preferred) or legacy `repos` param.
  const minR = minRepos ?? repos
  let query = q ? `${q}` : ''
  if (location) query += `+location:${location}`
  if (minR || minR === 0) query += `+repos:>=${minR}`
  if (!query) throw new Error('search query required')

  // Use explicit endpoint string to make the search URL obvious in the file
  const url = `${SEARCH_USERS_ENDPOINT}${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`
  const res = await axios.get(url, { headers: getHeaders() })
  return res.data
}

export default { fetchUserData, searchUsers }
