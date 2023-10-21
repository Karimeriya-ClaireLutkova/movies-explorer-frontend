import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, userData, onMovieLike, onMovieDelete }) {

  return (
    <section className="elements" aria-label="Список фильмов">
        {movies.map((movie, i) => (
          <MoviesCard key={movie.movieId} userData={userData} movie={movie} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />
        ))}
    </section>    
  )
}

export default MoviesCardList;