import { useState, useEffect } from 'react'
import { Container, CircularProgress, Alert } from '@mui/material'
import Header from './components/Header'
import SongGrid from './components/SongGrid'
import VideoPlayer from './components/VideoPlayer'
import { fetchSongs } from './services/api'
import './App.css'

function App() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)

  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = async () => {
    try {
      setLoading(true)
      const data = await fetchSongs()
      setSongs(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError('Failed to load songs. Please check the API connection.')
      console.error('Error loading songs:', err)
      setSongs([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary">
      <Header onRefresh={loadSongs} />
      
      {selectedSong && (
        <VideoPlayer 
          song={selectedSong} 
          onClose={() => setSelectedSong(null)} 
        />
      )}

      <Container maxWidth="lg" className="py-8">
        {error && (
          <Alert severity="error" className="mb-8">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <CircularProgress sx={{ color: '#ef4444' }} />
          </div>
        ) : songs.length === 0 ? (
          <Alert severity="info">No songs found. Please check the API.</Alert>
        ) : (
          <SongGrid 
            songs={songs} 
            onSongSelect={setSelectedSong}
          />
        )}
      </Container>
    </div>
  )
}

export default App