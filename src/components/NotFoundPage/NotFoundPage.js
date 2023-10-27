import React from 'react';
import './NotFoundPage.css';

function NotFoundPage({onBack}) {

  return (
    <main>
      <section className="missing-page">
        <div className="missing-page__container">
          <h1 className="missing-page__title">404</h1>
          <h2 className="missing-page__subtitle">Страница не найдена</h2>
          <button type="button" className="missing-page__button" onClick={onBack}>Назад</button>  
        </div>
      </section>   
    </main>     
  )
}

export default NotFoundPage;