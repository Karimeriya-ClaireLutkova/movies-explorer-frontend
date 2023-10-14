import React from 'react';
import logoPromo from '../../images/promo_logo.svg';

function Promo() {

  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img className='promo__logo' alt="Логотип учебного проекта" src={logoPromo}/>
    </section>
    
  )
}

export default Promo;