import React from 'react';
import './Portfolio.css';

function Portfolio() {

  return (
    <section className="portfolio">
      <p className="section__subline section__subline_type_portfolio">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/Karimeriya-ClaireLutkova/how-to-learn" target="_blank" rel="noreferrer">
            <h3 className="section__subtitle section__subtitle_type_portfolio">Статичный сайт</h3>
            <div className="portfolio__arrow"></div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/Karimeriya-ClaireLutkova/russian-travel" target="_blank" rel="noreferrer">
            <h3 className="section__subtitle section__subtitle_type_portfolio">Адаптивный сайт</h3>
            <div className="portfolio__arrow"></div>
          </a>
        </li>
        <li className="portfolio__list-item portfolio__list-item_type_last-child">
        <a className="portfolio__link" href="https://github.com/Karimeriya-ClaireLutkova/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            <h3 className="section__subtitle section__subtitle_type_portfolio">Одностраничное приложение</h3>
            <div className="portfolio__arrow"></div>
        </a>
        </li>
      </ul>
    </section>  
  )
}

export default Portfolio;