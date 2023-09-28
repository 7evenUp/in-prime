import React from "react"

const Benefits = () => {
  return (
    <>
      <div className="app__container__benefits-gradient" />
      <section className="app__container__benefits" id="benefits">
        <div className="app__container__benefits__title-logo">
          <div className="app__container__benefits__title-logo__title">
            Преимущества подписки Prime
          </div>
          <div className="app__container__benefits__title-logo__logo" />
        </div>
        <div className="app__container__benefits__points">
          <div className="app__container__benefits__points__col">
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <div className="app__container__benefits__points__col__point__text">
                ВЫЖИМКА ЛУЧШИХ СОБЫТИЙ РЫНКА
              </div>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <div className="app__container__benefits__points__col__point__text">
                ПОДРОБНЫЕ
                <br />
                ИНСТРУКЦИИ
              </div>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <div className="app__container__benefits__points__col__point__text">
                СТРУКТУРИРОВАННАЯ
                <br /> ИНФОРМАЦИЯ
              </div>
            </div>
          </div>

          <div className="app__container__benefits__points__col">
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <div className="app__container__benefits__points__col__point__text">
                ЭКОНОМИЯ ВРЕМЕНИ
              </div>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <div className="app__container__benefits__points__col__point__text">
                Для опытных и новичков
              </div>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <div className="app__container__benefits__points__col__point__text">
                КОМЬЮНИТИ ЕДИНОМЫШЛЕННИКОВ
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Benefits
