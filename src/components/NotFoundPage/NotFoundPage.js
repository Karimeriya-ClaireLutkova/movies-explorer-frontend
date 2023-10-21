import React from 'react';

function NotFoundPage({onBack}) {

  return (
    <main>
      <section className="missing-page">
        <h1 className="missing-page__title">404</h1>
        <h2 className="missing-page__title">Страница не найдена</h2>
        <button type="button" className="missing-page__button" onClick={onBack}>Назад</button>
      </section>   
    </main>     
  )
}

export default NotFoundPage;