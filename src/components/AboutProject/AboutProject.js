import React from 'react';


function AboutProject() {

  return (
    <section className='about-project' aria-label="Две колонки">
      <h2 className='section__title'>О проекте</h2>
      <article className='two-columns'>
        <h3 className='two-columns__brief'>Дипломный проект включал 5 этапов</h3>
        <p className='two-columns__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </article>
      <article className='two-columns'>
        <h3 className='two-columns__brief'>На выполнение диплома ушло 5 недель</h3>
        <p className='two-columns__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>
      <article className='two-columns'>
        <div className='two-columns__scheme'>
          <h3 className='two-columns__brief'>1 неделя</h3>
          <p className='two-columns__paragraph'>Back-end</p>
        </div>
        <div className='two-columns__scheme'>
          <h3 className='two-columns__brief'>4 недели</h3>
          <p className='two-columns__paragraph'>Front-end</p>
        </div>
      </article>
    </section>    
  )
}

export default AboutProject;