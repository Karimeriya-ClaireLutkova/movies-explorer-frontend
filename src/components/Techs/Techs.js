import React from 'react';

function Techs() {

  return (
    <section className='techs'>
      <h2 className='section__title'>Технологии</h2>
      <div className='techs__container'>
        <h3 className='section__subtitle'>7 технологий</h3>
        <p className='section__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='list'>
          <li className='list__item'>HTML</li>
          <li className='list__item'>CSS</li>
          <li className='list__item'>JS</li>
          <li className='list__item'>React</li>
          <li className='list__item'>Git</li>
          <li className='list__item'>Express.js</li>
          <li className='list__item'>mongoDB</li>
        </ul>
      </div>
    </section>    
  )
}

export default Techs;