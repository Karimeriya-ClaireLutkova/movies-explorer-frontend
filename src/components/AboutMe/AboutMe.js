import React from 'react';
import avatarStudent from '../../images/avatar_student.jpg';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

function AboutMe() {

  return (
    <section className="about-me" aria-label="Две части">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="section__subtitle section__subtitle_type_about-me">Виталий</h3>
          <p className="section__subline">Фронтенд-разработчик, 30 лет</p>
          <p className="section__paragraph section__paragraph_type_about-me">Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__link" href="https://github.com/Karimeriya-ClaireLutkova" target="_blank" rel="noreferrer">Github</a>
        </div> 
        <img className="about-me__image" src={avatarStudent} alt="Фотография студента"/>       
      </div>
      <Portfolio />      
    </section>    
  )
}

export default AboutMe;