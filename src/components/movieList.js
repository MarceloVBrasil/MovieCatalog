import React, { useState } from "react";
import Movie from "./movie";
import MovieAPI from "./movieAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function MovieList({ genre }) {
  const [movies, setMovies] = MovieAPI();
  const [scrollX, setScrollX] = useState(0);
  const [startTouchPositionX, setStartTouchPositionX] = useState();
  const [isMoving, setIsMoving] = useState(false);
  return (
    <>
      <h1 style={{ color: "white", textTransform: "capitalize" }}>{genre}</h1>
      <div className="movieList--container" style={{ marginLeft: scrollX }}>
        <div className="movieList--leftArrow" onClick={handleLeftArrow}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="movieList--rightArrow" onClick={handleRightArrow}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>

        {movies.map((movie) => {
          return (
            movie.genre === genre && <Movie key={movie.id} movie={movie} />
          );
        })}
      </div>
    </>
  );

  function handleLeftArrow() {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) x = 0;
    setScrollX(x);
  }

  function handleRightArrow() {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = movies.filter((movie) => movie.genre === genre).length * 230;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW;
    }

    setScrollX(x);
  }
}
