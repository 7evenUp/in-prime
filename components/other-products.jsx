import React from 'react';

function OtherProducts(props) {

    return (
        <div className="app__container__other-products">
          <div className="app__container__other-products__title-description">
            <div className="app__container__other-products__title-description__title">Другие продукты Crypton</div>
            <div className="app__container__other-products__title-description__description">
              <div className="app__container__other-products__title-description__description__text">Попробуйте наши бесплатные продукты для эффективного обучения и работы.</div>
              <div className="app__container__other-products__title-description__description__text">Наша команда собирает весь необходимый функционал и сервисы для работы в криптовалюте в рамках единой экосистемы, чтобы вы могли максимально продуктивно проводить своё время!</div>
            </div>
          </div>
          <div className="app__container__other-products__circles">
              <a href="https://t.me/crypton_research_bot" target={"_blank"}>
              <div className="app__container__other-products__circles__num research">01</div>
              <div className="app__container__other-products__circles__research">
                <div className="app__container__other-products__circles__research__content">
                  <div className="app__container__other-products__circles__research__content__title">Research bot</div>
                  <div className="app__container__other-products__circles__research__content__description">Для отслеживания всех значимых событий криптоиндустрии</div>
                </div>
              </div>
              </a>
              <a href="https://prime.crypton.xyz/" target={"_blank"}>
              <div className="app__container__other-products__circles__num academy">02</div>
              <div className="app__container__other-products__circles__academy" >
                <div className="app__container__other-products__circles__academy__content" >
                  <div className="app__container__other-products__circles__academy__content__title">Academy</div>
                  <div className="app__container__other-products__circles__academy__content__description">Необходимые материалы<br/> по обучению <br/>криптовалютам</div>
                </div>
              </div>
              </a>
              <a href="https://tools.crypton.xyz/" target={"_blank"}>
              <div className="app__container__other-products__circles__num tools">03</div>
              <div className="app__container__other-products__circles__tools">
                <div className="app__container__other-products__circles__tools__content">
                  <div className="app__container__other-products__circles__tools__content__title">Tools</div>
                  <div className="app__container__other-products__circles__tools__content__description">Агрегатор всех проверенных проектов и сервисов для работы в криптовалюте</div>
                </div>
              </div>
              </a>
          </div>
        </div>
    );
}

export default OtherProducts;