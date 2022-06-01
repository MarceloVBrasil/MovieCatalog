import React, { useState } from 'react'
import { useMyWatchlist } from '../Contexts/MyWatchlistProvider'
import Movie from './movie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Watchlist() {
  const {myWatchlist, setMyWatchlist, removeMovieFromWatchList} = useMyWatchlist()
  const [scrollX, setScrollX] = useState(0)
  const [startTouchPositionX, setStartTouchPositionX] = useState()
  
  return (
      <>
        <h1 style={{color: 'white'}}>Watchlist</h1>
        <div className='movieList--container' style={{marginLeft: scrollX}}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          <div className='movieList--leftArrow' onClick={handleLeftArrow}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className='movieList--rightArrow' onClick={handleRightArrow}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          
              {myWatchlist.map((movie) => (
                <Movie key={movie.id} movie={movie}/>
              ))}
        </div>
    </>
  )

  function handleLeftArrow()
  {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0) x = 0
    setScrollX(x)
  }

  function handleRightArrow()
  {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = myWatchlist.length * 230
    if(window.innerWidth - listW > x)
    {
      x = window.innerWidth - listW 
    }

    setScrollX(x)
  }

    function handleTouchStart(e)
  {
    const startPositionX = e.touches[0].pageX
    setStartTouchPositionX(startPositionX)
  }

  function handleTouchMove(e)
  {
    const listW = myWatchlist.length * 230
    const startPositionX = startTouchPositionX

    const currentTouchPositionX = e.touches[0].pageX
    const step = currentTouchPositionX - startPositionX
    const x = scrollX + step / 10

    if(x > 0) x = 0
    if(window.innerWidth - listW > x) x = window.innerWidth - listW
    
    setScrollX(x)
  }
}
