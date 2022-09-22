import React, { useContext, useState } from 'react'
import MovieAPI from '../components/movieAPI'

const MyCatalog = React.createContext()

export function useMyCatalog()
{
    return useContext(MyCatalog)
}

export default function MyCatalogProvider({children}) {
  const [movies, setMovies, searchMovie] = MovieAPI()
  const [selectedMovieId, setSelectedMovieId] = useState('tt0203019')
  const selectedMovie = movies.find(m => m.id === selectedMovieId)

  function handleMovieChange(id, newMovie)
  {
    const newMovies = [...movies]
    const index = newMovies.findIndex(movie => movie.id === id)
    newMovies[index] = newMovie
    setMovies(newMovies)
  }

  const myCatalogContextValues = 
  {
    handleMovieChange,
    movies,
    selectedMovieId,
    setSelectedMovieId,
    selectedMovie

  }

  return (
      <MyCatalog.Provider value={myCatalogContextValues}>
          {children}
      </MyCatalog.Provider>
  )
}
