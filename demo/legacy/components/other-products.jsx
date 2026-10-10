import React from 'react';
import TeamArrow from "@/public/archive-assets/images/jsx/ceo/arrow";

function OtherProducts(props) {

    return (
        <div className="app__container__other-products">
          <div className="app__container__other-products__title-description">
            <div className="app__container__other-products__title-description__title">Другие продукты Crypton</div>
            <div className="app__container__other-products__title-description__description">
              <div className="app__container__other-products__title-description__description__text">Попробуй наши бесплатные сервисы для обучения и работы с криптовалютой.</div>
              <div className="app__container__other-products__title-description__description__text">Экономь своё время - наша команда собирает все важные проекты и ресурсы в удобном формате.</div>
            </div>
          </div>
          <div className="app__container__other-products__circles">
              <a href="https://t.me/Crypton_Calendar_bot" target={"_blank"} className="app__container__other-products__circles__calendar__link">
              <div className="app__container__other-products__circles__num calendar">01</div>
              <div className="app__container__other-products__circles__calendar">
                <div className="app__container__other-products__circles__calendar__content">
                  <div className="app__container__other-products__circles__calendar__content__logo" />
                  <div className="app__container__other-products__circles__calendar__content__title">
                      Календарь
                      <div className="app__container__other-products__circles__arrow">
                          <svg width="100%" height="100%" viewBox="0 0 12 12"xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                              <path d="M1 11L11 1M11 1H2.24088M11 1V9.24818" stroke-width="2"/>
                          </svg>
                      </div>
                  </div>
                  <div className="app__container__other-products__circles__calendar__content__description">Все криптоактивности в одном месте</div>
                </div>
              </div>
              </a>
              <a href="https://t.me/crypton_research_bot" target={"_blank"} className="app__container__other-products__circles__research__link">
              <div className="app__container__other-products__circles__num research">02</div>
              <div className="app__container__other-products__circles__research" >
                <div className="app__container__other-products__circles__research__content" >
                  <div className="app__container__other-products__circles__research__content__logo" />
                  <div className="app__container__other-products__circles__research__content__title">
                      Research
                      <div className="app__container__other-products__circles__arrow">
                          <svg width="100%" height="100%" viewBox="0 0 12 12"xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                              <path d="M1 11L11 1M11 1H2.24088M11 1V9.24818" stroke-width="2"/>
                          </svg>
                      </div>
                  </div>
                  <div className="app__container__other-products__circles__research__content__description">Следи за выжимками только важных новостей от любимых проектов</div>
                </div>
              </div>
              </a>

              <a href="https://tools.crypton.xyz/" target={"_blank"} className="app__container__other-products__circles__tools__link">
              <div className="app__container__other-products__circles__num tools">03</div>
              <div className="app__container__other-products__circles__tools">
                <div className="app__container__other-products__circles__tools__content">
                  <div className="app__container__other-products__circles__tools__content__logo" />
                  <div className="app__container__other-products__circles__tools__content__title">
                      Tools
                      <div className="app__container__other-products__circles__arrow">
                          <svg width="100%" height="100%" viewBox="0 0 12 12"xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                              <path d="M1 11L11 1M11 1H2.24088M11 1V9.24818" stroke-width="2"/>
                          </svg>
                      </div>
                  </div>
                  <div className="app__container__other-products__circles__tools__content__description">Большая библиотека всех лучших и проверенных криптосайтов, сервисов и приложений</div>
                </div>
              </div>
              </a>
          </div>
        </div>
    );
}

export default OtherProducts;
