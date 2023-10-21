import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {

  return (
    <section className="elements" aria-label="Список фильмов">
        {movies.map((movie, i) => (
          <MoviesCard key={movie.movieId} image={movie.image} name={movie.nameRU} owner={movie.owner} onCardClick={props.isCardClick} />
        ))}
    </section>    
  )
}

export default MoviesCardList;