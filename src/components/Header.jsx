import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

function Header({ onRefresh }) {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#374151', boxShadow: 3 }}>
      <Toolbar>
        <MusicNoteIcon sx={{ fontSize: 32, marginRight: 1.5, color: '#ef4444' }} />
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Song API Player
        </Typography>
        <IconButton 
          color="inherit" 
          onClick={onRefresh}
          sx={{ '&:hover': { color: '#ef4444' } }}
        >
          <RefreshIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header