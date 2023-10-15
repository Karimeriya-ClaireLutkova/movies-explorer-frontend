import React from 'react';


function AboutMe() {

  return (
    <section className='about-me' aria-label="Два блока">
      <h2 className='section__title'>Студент</h2>
      <article className=''>
        <h3 className='section__subtitle'>Виталий</h3>
        <p className='section__paragraph'>.</p>
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

export default AboutMe;