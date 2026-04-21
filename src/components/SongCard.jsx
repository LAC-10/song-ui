import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from 'react'

function SongCard({ song, onPlay }) {
  const [liked, setLiked] = useState(false)

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Get Spotify album art or use placeholder
  const getAlbumArt = () => {
    if (song.imageUrl) return song.imageUrl
    if (song.albumArt) return song.albumArt
    if (song.image) return song.image
    
    // Placeholder with song name
    return null
  }

  const albumArt = getAlbumArt()

  return (
    <Card 
      sx={{
        backgroundColor: '#374151',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.05)',
        }
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: 200,
          background: albumArt 
            ? `url(${albumArt}) center/cover` 
            : 'linear-gradient(135deg, #ef4444 0%, #9333ea 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)'}
        >
          <PlayArrowIcon 
            sx={{ 
              fontSize: 64, 
              color: 'white', 
              opacity: 0,
              transition: 'opacity 0.3s',
              '&:hover': { opacity: 1 },
              textShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}
          />
        </div>
        {!albumArt && (
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white', 
              textAlign: 'center', 
              px: 2,
              zIndex: 1,
              fontWeight: 'bold'
            }}
          >
            {song.title || song.name || 'Unknown'}
          </Typography>
        )}
      </CardMedia>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {song.title || song.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#9ca3af',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {song.artist || song.author || 'Unknown Artist'}
        </Typography>

        {song.duration && (
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            Duration: {formatDuration(song.duration)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ gap: 1 }}>
        <Button 
          fullWidth
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={onPlay}
          sx={{ 
            backgroundColor: '#ef4444',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#dc2626' }
          }}
        >
          Play
        </Button>
        <Button
          size="small"
          onClick={() => setLiked(!liked)}
          sx={{ 
            color: '#ef4444',
            '&:hover': { color: '#dc2626' }
          }}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </CardActions>
    </Card>
  )
}

export default SongCard