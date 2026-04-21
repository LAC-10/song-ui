import SongCard from './SongCard'

function SongGrid({ songs, onSongSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {songs.map((song) => (
        <SongCard 
          key={song.id} 
          song={song} 
          onPlay={() => onSongSelect(song)}
        />
      ))}
    </div>
  )
}

export default SongGrid