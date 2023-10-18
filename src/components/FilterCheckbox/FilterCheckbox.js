import React from 'react';


function FilterCheckbox() {

  return (
    <div className='filter-checkbox'>
      <label class="form__label form__label_direction_right" for="one-column">
        <input type="radio" class="form__item form__item_el_number-of-columns" name="number-of-columns" id="one-column" value="one-column" checked />
        <span class="form__pseudo-item form__pseudo-item_type_radio"></span>
      </label>
      <label class="form__label form__label_direction_right" for="two-columns">
        <input type="radio" class="form__item form__item_el_number-of-columns" name="number-of-columns" id="two-columns" value="two-columns" />
        <span class="form__pseudo-item form__pseudo-item_type_radio"></span>
      </label>
      <h3 class="form__heading form__heading_type_ctrl-el-heading">Короткометражки</h3>
    </div>
    
 
  )
}

export default FilterCheckbox;
