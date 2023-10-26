import React from 'react';
import './Techs.css';

function Techs() {

  return (
    <section className="techs">
      <h2 className="section__title section__title_type_techs">Технологии</h2>
      <div className="techs__container">
        <h3 className="section__subtitle section__subtitle_type_techs">7 технологий</h3>
        <p className="section__paragraph section__paragraph_type_techs">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__list-item">HTML</li>
          <li className="techs__list-item">CSS</li>
          <li className="techs__list-item">JS</li>
          <li className="techs__list-item">React</li>
          <li className="techs__list-item">Git</li>
          <li className="techs__list-item">Express.js</li>
          <li className="techs__list-item">mongoDB</li>
        </ul>
      </div>
    </section>    
  )
}

export default Techs;