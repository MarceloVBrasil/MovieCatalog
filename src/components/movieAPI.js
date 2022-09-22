import { useEffect, useState } from 'react'
import { useMyWatchlist } from '../Contexts/MyWatchlistProvider'

export default function MovieAPI() {
  const [movies, setMovies] = useState([])
  const {myWatchlist, isThisMovieInMyWatchlist} = useMyWatchlist()
  let idx = 0
  
  async function searchMovie(title, genre, trailer)
  {
    const response = await fetch(`https://www.omdbapi.com/?apikey=4799f506&t=${title}`) 
    const data = await response.json()
    setMovies(
      prev =>
      [...prev, 
        {id: data.imdbID, title: data.Title, poster: data.Poster, rating: data.imdbRating,
          genre: genre,  plot: data.Plot, trailer: trailer, watchlist: isThisMovieInMyWatchlist(data), index: idx++}
      ]
    )
  }
  
  function putInOrder(arr)
  {
    let idx = 0
    let res = []
    const len = arr.length

    while(idx < len)
    {
        for(let j = 0; j < len; j++)
        {
            if(arr[j].index === idx)
            {
                res.push(arr[j])
            }
        }
        idx++
    }
    return res
  }

  useEffect(() => {
    // Drama    
    searchMovie('Bicycle Thieves', 'drama', 'https://www.youtube.com/watch?v=H2P4xo9kmPM')
    searchMovie(`It's a Wonderful Life`, 'drama', 'https://www.youtube.com/watch?v=iLR3gZrU2Xo')
    searchMovie(`The Godfather`, 'drama', 'https://www.youtube.com/watch?v=sY1S34973zA&t=7s')
    searchMovie("Joyeux Noel", 'drama', 'https://www.youtube.com/watch?v=KRrr-CDXijs')
    searchMovie("Bicentennial Man", 'drama', 'https://www.youtube.com/watch?v=yfDlQ-Q12rg')
    searchMovie("Gattaca", 'drama', 'https://www.youtube.com/watch?v=W_KruQhfvW4')
    searchMovie("On the Waterfront", 'drama', 'https://www.youtube.com/watch?v=vOdYAXOfLMc')
    searchMovie(`The Hunt`, 'drama', 'https://www.youtube.com/watch?v=ieLIOBkMgAQ')
    searchMovie(`A Few Good Men`, 'drama', 'https://www.youtube.com/watch?v=cXMNGokxbQA')
    // Action
    searchMovie(`The Matrix`, 'action', 'https://www.youtube.com/watch?v=vKQi3bBA1y8')
    searchMovie(`Batman Begins`, 'action', 'https://www.youtube.com/watch?v=neY2xVmOfUM')
    searchMovie(`Rocky`, 'action', 'https://www.youtube.com/watch?v=7RYpJAUMo2M')
    searchMovie(`The Book of Eli`, 'action', 'https://www.youtube.com/watch?v=zSMHmtaoXtI')
    searchMovie(`Captain Phillips`, 'action', 'https://www.youtube.com/watch?v=GEyM01dAxp8')
    searchMovie(`The Patriot`, 'action', 'https://www.youtube.com/watch?v=R_C_dPHEWN0')
    searchMovie(`1917`, 'action', 'https://www.youtube.com/watch?v=YqNYrYUiMfg')
    searchMovie(`Elite Squad`, 'action', 'https://www.youtube.com/watch?v=uZBiNJQxtGw')    
    searchMovie(`Black Hawk Down`, 'action', 'https://www.youtube.com/watch?v=2GfBkC3qs78')
    // Biography
    searchMovie('Men of Honor', 'biography', 'https://www.youtube.com/watch?v=E21xH5vg0yo')
    searchMovie('A Man for All Seasons', 'biography', 'https://www.youtube.com/watch?v=ZT8v3wLzfVY')
     searchMovie('The Social Network', 'biography', 'https://www.youtube.com/watch?v=lB95KLmpLR4')
     searchMovie('Moneyball', 'biography', 'https://www.youtube.com/watch?v=-4QPVo0UIzc')
     searchMovie('Hannah Arendt', 'biography', 'https://www.youtube.com/watch?v=KDO5u2YSbm0')
     searchMovie(`Schindler's List`, 'biography', 'https://www.youtube.com/watch?v=gG22XNhtnoY')
     searchMovie(`The Passion of the Christ`, 'biography', 'https://www.youtube.com/watch?v=4Aif1qEB_JU')
     searchMovie(`Braveheart`, 'biography', 'https://www.youtube.com/watch?v=1NJO0jxBtMo')
     searchMovie(`The imitation game`, 'biography', 'https://www.youtube.com/watch?v=nuPZUUED5uk')

  }, [])

  useEffect(() => {
    setMovies(prevMovies => {
      const inList = prevMovies.filter((prevMovie) => isThisMovieInMyWatchlist(prevMovie))
      const updatedInList = inList.map((movie) => {return {...movie, watchlist: true}})

      const notInList = prevMovies.filter((prevMovie) => !isThisMovieInMyWatchlist(prevMovie))
      const updatedNotInList = notInList.map((movie) => { return {...movie, watchlist: false}})

      const unorderedMovies = [...updatedInList, ...updatedNotInList]

      const orderedMovies = putInOrder(unorderedMovies)
      return [...orderedMovies]
    })
  }, [myWatchlist])

  return [movies, setMovies]
}