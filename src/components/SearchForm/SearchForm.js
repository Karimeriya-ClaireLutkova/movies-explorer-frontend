import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {

  return (
    <section className="search">
      <form className="search-form">
        <div className="search-form__container">
          <div className="search-form__field">
            <div className="search-form__icon"></div>
            <input id="movies-data-input" type="text" className="search-form__input search-form__input_type_entry" name="film" placeholder="Фильм" required  />
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