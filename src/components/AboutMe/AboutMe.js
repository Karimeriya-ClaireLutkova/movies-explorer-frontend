import React from 'react';
import avatarStudent from '../../images/avatar_student.jpg';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {

  return (
    <section className="about-me" aria-label="Две части">
      <h2 className="title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="subtitle subtitle_about-me">Cветлана</h3>
          <p className="subline subline_about-me">Фронтенд-разработчик, 35 лет</p>
          <p className="paragraph paragraph_about-me">Я родилась и живу в Екатеринбурге, окончила УрГЮУ(бывш.УрГЮА).
            У&nbsp;меня есть муж и дети. Я&nbsp;люблю слушать музыку, читать книги и гулять, а еще математику. Кодить начала недавно, 
            но это именно то, что меня вдохновляет и наполняет мой мир красками.
            Много лет я&nbsp;работала госслужащим. После того, как поступила на курс по веб-разработке,
            поняла, что нашла свою стезю.
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