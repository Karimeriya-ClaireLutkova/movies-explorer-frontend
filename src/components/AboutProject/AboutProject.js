import React from 'react';
import './AboutProject.css';

function AboutProject() {

  return (
    <section className="about-project" aria-label="Две колонки">
      <h2 className="section__title section__title_type_about-project">О проекте</h2>
      <div className="about-project__container">
        <article className="stages">
          <h3 className="about-project__brief">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="stages">
          <h3 className="about-project__brief">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
        <article className="distribution">
            <h3 className="about-project__brief about-project__brief_type_decrease">1 неделя</h3>
            <p className="about-project__paragraph about-project__paragraph_type_distribution">Back-end</p>
            <h3 className="about-project__brief about-project__brief_type_increase">4 недели</h3>
            <p className="about-project__paragraph about-project__paragraph_type_distribution">Front-end</p>
        </article>       
      </div>     
    </section>
  )
}

export default AboutProject;