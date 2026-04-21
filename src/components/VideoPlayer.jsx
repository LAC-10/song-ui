import { Dialog, DialogTitle, DialogContent, Button, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useState } from 'react'

function VideoPlayer({ song, onClose }) {
  const [playing, setPlaying] = useState(false)

  // Extract YouTube video ID from URL
  const getYoutubeId = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeId = getYoutubeId(song.videoUrl || song.url)

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const togglePlayPause = () => {
    setPlaying(!playing)
  }

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1f2937',
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          backgroundColor: '#374151', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {song.title || song.name}
        </Typography>
        <Button 
          onClick={onClose} 
          sx={{ color: 'white', minWidth: 0, p: 1 }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: '#1f2937', p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* YouTube Player */}
          <Box 
            sx={{
              position: 'relative',
              backgroundColor: '#000',
              borderRadius: 2,
              overflow: 'hidden',
              aspectRatio: '16 / 9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {youtubeId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${playing ? 1 : 0}`}
                title={song.title || song.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              />
            ) : (
              <Typography sx={{ color: 'white', textAlign: 'center' }}>
                No video URL available
              </Typography>
            )}
          </Box>

          {/* Song Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              {song.title || song.name}
            </Typography>
            <Typography sx={{ color: '#9ca3af' }}>
              {song.artist || song.author || 'Unknown Artist'}
            </Typography>
            {song.description && (
              <Typography sx={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                {song.description}
              </Typography>
            )}
          </Box>

          {/* Controls */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={togglePlayPause}
              startIcon={playing ? <PauseIcon /> : <PlayArrowIcon />}
              fullWidth
              sx={{ 
                backgroundColor: '#ef4444',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#dc2626' }
              }}
            >
              {playing ? 'Pause' : 'Play'}
            </Button>
          </Box>

          {/* Info Message */}
          <Typography variant="caption" sx={{ color: '#9ca3af', textAlign: 'center' }}>
            YouTube video will play in the embedded player above
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default VideoPlayer