import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({onUpdateMoviesList}) {
  const [name, setName] = React.useState('');

  function handleSearchMovies(evt) {
    setName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateMoviesList({
      name: name
    });
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit} >
        <div className="search-form__container">
          <div className="search-form__field">
            <div className="search-form__icon"></div>
            <input id="movies-data-input" type="text" className="search-form__input search-form__input_type_entry" name="film" placeholder="Фильм" onChange={handleSearchMovies} required  />
            <span className="movies-data-input-error search-form__input-error"></span>
          </div>
          <button type="submit" className="search-form__button">Найти</button>
        </div>
        <div className="search-form__filter">
            <FilterCheckbox />
        </div>
      </form>
    </section>
  )
}

export default SearchForm;