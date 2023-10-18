import React from 'react';
import loupeIcon from '../../images/loupe_icon.svg';

function SearchForm() {

  return (
    <section className='filter-checkbox'>
      <form className='filter-checkbox__form' name  onSubmit>
        <img className='filter-checkbox__img' alt='Изображение лупы' src={loupeIcon}/>
        <div className='filter-checkbox__form-search'>
          <div className='filter-checkbox__field'>
            <input id='movies-data-input' type='text' className='filter-checkbox__input filter-checkbox__input_type_entry' name='film' value placeholder='Фильм' onChange required  />
            <span className='movies-data-input-error filter-checkbox__input-error'></span>
          </div>
        </div>
        <button type='submit' className=''>Найти</button>
      </form>
      

    </section>    
  )
}

export default SearchForm;