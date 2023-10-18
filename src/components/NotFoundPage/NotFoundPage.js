import React from 'react';
import imgNotFoundPage from '../../images/img_404_notfound.jpg';

function NotFoundPage() {

  return (
    <section className='missing-page'>
      <img className='missing-page__img' alt='Ошибка с кодом 404' src={imgNotFoundPage}/>
      <h2 className='missing-page__title'>Страница не найдена</h2>
      <button type='button' className='missing-page__button' onClick>Назад</button>
    </section>    
  )
}

export default NotFoundPage;