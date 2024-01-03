import React from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

function FilterCheckbox({onActiveFilter, isActiveFilterMovies}) {
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    setActiveFilter(isActiveFilterMovies);
  }, [isActiveFilterMovies]);

  function handleActiveFilter() {
    const status = !isActiveFilter;
    setActiveFilter(status);
    onActiveFilter(status);
  }
  
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__toggle">
        { pathname === "/movies" ? (
          <>
          <input type="checkbox" id={1} className="filter-checkbox__input" name="filter" onChange={handleActiveFilter}/>
          <span className="filter-checkbox__slider"></span>
          </>
        ) : (
          <>
          <input type="checkbox" id={2} className="filter-checkbox__input" name="filter" onChange={handleActiveFilter}/>
          <span className="filter-checkbox__slider"></span>
          </>
        )}
      </label>
      <h3 className="filter-checkbox__subtitle">Короткометражки</h3>
    </div>
  )
}

export default FilterCheckbox;