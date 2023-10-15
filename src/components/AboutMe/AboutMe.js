import React from 'react';
import avatarStudent from '../../images/avatar_student.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {

  return (
    <section className='about-me' aria-label="Две части">
      <h2 className='section__title'>Студент</h2>
      <article className='about-me__info'>
        <h3 className='section__subtitle'>Виталий</h3>
        <p className='section__subline'>Фронтенд-разработчик, 30 лет</p>
        <p className='section__paragraph'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
         У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
         С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
         начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a className='about-me__link' href='https://github.com/Karimeriya-ClaireLutkova' target='_blank' rel='noreferrer'>Github</a>
        <img className='about-me__image' src={avatarStudent} alt='Фотография студента'/>
      </article>
      <Portfolio />      
    </section>    
  )
}

export default AboutMe;