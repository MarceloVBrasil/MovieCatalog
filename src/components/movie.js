import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import MovieAPI from './movieAPI'
import { Poster } from './styles/movie--poster.styled'
import { Title } from './styles/movie--title.styled'
import { Rating } from './styles/movie--rating.styled'
import { WatchlistButton } from './styles/movie--watchListButton.styled'
import { useMyWatchlist } from '../Contexts/MyWatchlistProvider'
import { useMyCatalog } from '../Contexts/MyCatalogProvider'

export default function Movie({movie}) {
const [movies, setMovies] = MovieAPI()
const {isThisMovieInMyWatchlist,addMovieToWatchlist, removeMovieFromWatchlist, myWatchlist} = useMyWatchlist()
const {handleMovieChange, setSelectedMovieId} = useMyCatalog()

  return (
    <>
      <div className='movie--container'>
        <a href='#selectedMovie'><Poster src={movie.poster} onClick={() => setSelectedMovieId(movie.id)}/></a>

        <div className='movie--starIcon movie--rating'>
          <FontAwesomeIcon icon={faStar} />
          <Rating>{movie.rating}</Rating>
        </div>

        <Title>{movie.title}</Title>

        <WatchlistButton onClick={() => handleWatchlist(movie.id)}>
          {!movie.watchlist ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
        </WatchlistButton>
      </div>
    </>
  )

  function handleWatchlist(id)
  {    
    handleMovieChange(id, {...movie, watchlist: !movie.watchlist})

    if(isThisMovieInMyWatchlist(movie))
    {
      removeMovieFromWatchlist(id)
    }else{
      addMovieToWatchlist({...movie, watchlist:!movie.watchlist})
    }
  }
}
