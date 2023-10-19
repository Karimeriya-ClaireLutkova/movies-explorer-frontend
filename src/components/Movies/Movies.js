import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies() {


  return (
    <section className='movies'>
      <SearchForm />
      <Preloader />
      
      
    </section>    
  )
}

export default Movies;