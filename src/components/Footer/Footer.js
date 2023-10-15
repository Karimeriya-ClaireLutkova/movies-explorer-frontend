import React from 'react';

function Footer() {

  return (
    <footer className='footer'>
      <h2 className='section__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__container'>
        <p className='footer__copyright'>&#169; 2023</p>
        <nav>
          <ul className='footer__links'>
            <li>
              <a className='footer__link' href='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
            </li>
            <li>
              <a className='footer__link' href='https://github.com' target='_blank' rel='noreferrer'>Github</a>
            </li>
          </ul>
        </nav>
      </div>        
    </footer> 
  )
}

export default Footer;