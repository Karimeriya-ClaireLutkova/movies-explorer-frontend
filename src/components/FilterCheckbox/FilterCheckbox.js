import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__toggle">
        <input type="checkbox" className="filter-checkbox__input" name="filter" />
        <span className="filter-checkbox__slider"></span>
      </label>
      <h3 className="filter-checkbox__subtitle">Короткометражки</h3>
    </div>   
  )
}

export default FilterCheckbox;