import React, { useContext, useState } from 'react'
import useLocalStorage from '../components/Hooks/useLocalStorage'

const MyWatchlist = React.createContext()

export function useMyWatchlist()
{
    return useContext(MyWatchlist)
}

export default function MyWatchlistProvider({children}) {
  const [myWatchlist, setMyWatchlist] = useLocalStorage('Watchlist', [])

  function addMovieToWatchlist(movie)
  {
    setMyWatchlist(prev => {
        if(isThisMovieInMyWatchlist(movie.id)) return prev
        return [...prev, movie]
    })
  }

  function removeMovieFromWatchlist(id)
  {
      setMyWatchlist(prev => prev.filter(m => m.id !== id))
  }

  function isThisMovieInMyWatchlist(movie)
  {
      return myWatchlist.some(m => m.id === movie.id || m.id === movie.imdbID)
  }

  const myWatchlistContextValues = 
  {
      myWatchlist,
      setMyWatchlist,
      addMovieToWatchlist,
      removeMovieFromWatchlist,
      isThisMovieInMyWatchlist
  }

  return (
      <MyWatchlist.Provider value={myWatchlistContextValues}>
          {children}
      </MyWatchlist.Provider>
  )
}
