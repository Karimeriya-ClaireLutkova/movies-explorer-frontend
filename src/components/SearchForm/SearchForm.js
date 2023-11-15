import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidator from '../../hooks/useFormValidator';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ textInput, onUpdateMoviesList, onActiveFilter, isActiveFilterMovies }) {
  const [name, setName] = React.useState('');
  const { pathname } = useLocation();
  const { errors, isValid, handleChange, resetForm } = useFormValidator();

  React.useEffect(() => {
    setName(textInput);
  }, [textInput]);

  function handleSearchMovies(evt) {
    handleChange(evt);
    if(evt.target.name === 'film') {
      setName(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateMoviesList({
      name: name,
    }, isValid);
    resetForm();
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__container">
          <div className="search-form__field">
            <div className="search-form__icon"></div>
            <input id="movies-data-input" type="text" className={`search-form__input search-form__input_type_entry ${errors.film ? "search-form__input_error" :""}`} name="film" value={name} placeholder="Фильм" onChange={handleSearchMovies} required  />
            <span className={`movies-data-input-error search-form__input-error ${errors.film ? "search-form__input-error_active" : ""}`}>{errors.film}</span>
          </div>
          <button type="submit" className={`search-form__button ${!isValid ? "search-form__button_inactive" : ""}`}>Найти</button>
        </div>
        <div className="search-form__filter">
          { pathname === "/movies" ? (
            <FilterCheckbox id="1" onActiveFilter={onActiveFilter} isActiveFilterMovies={isActiveFilterMovies} />
          ) : ( 
            <FilterCheckbox id="2" onActiveFilter={onActiveFilter} isActiveFilterMovies={isActiveFilterMovies} />
          )}
        </div>
      </form>
    </section>
  )
}

export default SearchForm;