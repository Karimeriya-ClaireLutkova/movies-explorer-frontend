import React from 'react';
import loupeIcon from '../../images/loupe_icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <section className='search-form'>
      <form className='search-form__form' name  onSubmit>
        <img className='search-form__img' alt='Изображение лупы' src={loupeIcon}/>
        <div className='search-form__form-search'>
          <div className='search-form__field'>
            <input id='movies-data-input' type='text' className='search-form__input search-form__input_type_entry' name='film' value placeholder='Фильм' onChange required  />
            <span className='movies-data-input-error search-form__input-error'></span>
          </div>
        </div>
        <button type='submit' className='search-form__button'>Найти</button>
      </form>
      <FilterCheckbox />

    </section>    
  )
}

export default SearchForm;