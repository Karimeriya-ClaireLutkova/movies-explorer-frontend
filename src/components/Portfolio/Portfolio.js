import React from 'react';
import arrowLink from '../../images/arrow_portfolio.svg';

function Portfolio() {
  
  return (
    <section className='portfolio'>
      <p className='section__subline'>Портфолио</p>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a className='portfolio__link' href='https://github.com/Karimeriya-ClaireLutkova/how-to-learn' target='_blank' rel="noreferrer">
            <h3 className='section__subtitle'>Статичный сайт</h3>
            <img className='portfolio__arrow' src={arrowLink} alt='Стрелка вверх вправо'/>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__link' href='https://github.com/Karimeriya-ClaireLutkova/russian-travel' target='_blank' rel="noreferrer">
            <h3 className='section__subtitle'>Адаптивный сайт</h3>
            <img className='portfolio__arrow' src={arrowLink} alt='Стрелка вверх вправо'/>
          </a>
        </li>
        <li className='portfolio__list-item'>
        <a className='portfolio__link' href='https://github.com/Karimeriya-ClaireLutkova/react-mesto-api-full-gha' target='_blank' rel="noreferrer">
            <h3 className='section__subtitle'>Одностраничное приложение</h3>
            <img className='portfolio__arrow' src={arrowLink} alt='Стрелка вверх вправо'/>
          </a>
        </li>
      </ul>
    </section>    
  )
}

export default Portfolio;