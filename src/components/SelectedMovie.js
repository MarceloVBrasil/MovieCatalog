import React from 'react'
import { useMyCatalog } from '../Contexts/MyCatalogProvider'
import ReactPlayer from 'react-player'


export default function SelectedMovie() {
    const { movies, selectedMovie } = useMyCatalog()
    const selectedMovieInfo = selectedMovie
  return (
    <div style={{color: 'white'}}>
      <h1>{selectedMovieInfo?.title}</h1>
      <div className='selectedMovie--movie' id='selectedMovie'>
        <img src={selectedMovieInfo?.poster}/>
        <ReactPlayer url={selectedMovieInfo?.trailer} controls={true} className='selectedMovie--video'/>
      </div>
      <h3 className='selectedMovie--plot'>{selectedMovieInfo?.plot}</h3>
    </div>
  )
}
