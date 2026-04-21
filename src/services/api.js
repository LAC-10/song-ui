import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Mock songs data for testing
const mockSongs = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    author: 'Queen',
    duration: 354,
    videoUrl: 'https://www.youtube.com/embed/fJ9rUzIMt7o',
    url: 'https://www.youtube.com/embed/fJ9rUzIMt7o',
    description: 'A legendary rock opera masterpiece'
  },
  {
    id: 2,
    title: 'Imagine',
    name: 'Imagine',
    artist: 'John Lennon',
    author: 'John Lennon',
    duration: 183,
    videoUrl: 'https://www.youtube.com/embed/DVg2EJvvlF8',
    url: 'https://www.youtube.com/embed/DVg2EJvvlF8',
    description: 'An iconic peace anthem'
  },
  {
    id: 3,
    title: 'Stairway to Heaven',
    name: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    author: 'Led Zeppelin',
    duration: 482,
    videoUrl: 'https://www.youtube.com/embed/D9-voINFkCg',
    url: 'https://www.youtube.com/embed/D9-voINFkCg',
    description: 'One of the greatest rock songs ever'
  },
  {
    id: 4,
    title: 'Blinding Lights',
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    author: 'The Weeknd',
    duration: 200,
    videoUrl: 'https://www.youtube.com/embed/4NRXx6U8ABQ',
    url: 'https://www.youtube.com/embed/4NRXx6U8ABQ',
    description: 'Modern synthwave hit'
  },
  {
    id: 5,
    title: 'Like a Rolling Stone',
    name: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    author: 'Bob Dylan',
    duration: 369,
    videoUrl: 'https://www.youtube.com/embed/e0Bs-K0uqwA',
    url: 'https://www.youtube.com/embed/e0Bs-K0uqwA',
    description: 'A folk-rock revolution'
  },
  {
    id: 6,
    title: 'Hotel California',
    name: 'Hotel California',
    artist: 'Eagles',
    author: 'Eagles',
    duration: 391,
    videoUrl: 'https://www.youtube.com/embed/sQ6-HyVUV_A',
    url: 'https://www.youtube.com/embed/sQ6-HyVUV_A',
    description: 'Classic rock masterpiece'
  }
]

export const fetchSongs = async () => {
  try {
    // Try to fetch from API first
    const response = await api.get('/songs')
    return response.data
  } catch (error) {
    console.warn('API not available, using mock data:', error.message)
    // Return mock data if API is not available
    return mockSongs
  }
}

export const getSongById = async (id) => {
  try {
    const response = await api.get(`/songs/${id}`)
    return response.data
  } catch (error) {
    return mockSongs.find(song => song.id === id)
  }
}

export const createSong = async (songData) => {
  try {
    const response = await api.post('/songs', songData)
    return response.data
  } catch (error) {
    console.error('Error creating song:', error)
    throw error
  }
}

export const updateSong = async (id, songData) => {
  try {
    const response = await api.put(`/songs/${id}`, songData)
    return response.data
  } catch (error) {
    console.error('Error updating song:', error)
    throw error
  }
}

export const deleteSong = async (id) => {
  try {
    await api.delete(`/songs/${id}`)
  } catch (error) {
    console.error('Error deleting song:', error)
    throw error
  }
}

export default api