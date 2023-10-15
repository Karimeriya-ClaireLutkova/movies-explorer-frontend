import React from 'react';

function Footer() {

  return (
    <footer class="footer">
      <p class="footer__copyright">&#169; 2023</p>
      <nav>
        <ul class="footer__links">
          <li>
            <a class='footer__link' href='https://yandex.ru/maps' target='_blank' rel='noreferrer'>Карты</a>
          </li>
          <li>
            <a class='footer__link' href='https://yandex.ru/pogoda' target='_blank' rel='noreferrer'>Погода</a>
          </li>
        </ul>
      </nav>    
    </footer> 
  )
}

export default Footer;