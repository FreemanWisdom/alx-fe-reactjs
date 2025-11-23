import axios from 'axios'

const GITHUB_API = 'https://api.github.com'
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

// queryParams: { q, location, repos, page, per_page }
export async function searchUsers({ q, location, repos, page = 1, per_page = 30 }) {
  // Build q string for the Search API
  let query = q ? `${q}` : ''
  if (location) query += `+location:${location}`
  if (repos) query += `+repos:>=${repos}`
  if (!query) throw new Error('search query required')

  const url = `${GITHUB_API}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`
  const res = await axios.get(url, { headers: getHeaders() })
  return res.data
}

export default { fetchUserData, searchUsers }
