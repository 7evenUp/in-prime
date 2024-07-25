import React from "react"

const Benefits = () => {
  return (
    <>
      <section className="app__container__benefits" id="benefits">
        <div className="app__container__benefits-gradient" />

        <div className="app__container__benefits__title-logo">
          <h2 className="app__container__benefits__title-logo__title">
            Используйте наши преимущества на максимум
          </h2>
          <div className="app__container__benefits__title-logo__logo" />
        </div>
        <div className="app__container__benefits__points">
          <div className="app__container__benefits__points__col">
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <p className="app__container__benefits__points__col__point__text">
                Получайте лучшие события по заработку
              </p>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <p className="app__container__benefits__points__col__point__text">
                Детальные инструкции
              </p>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <p className="app__container__benefits__points__col__point__text">
                Понятный план действий
              </p>
            </div>
          </div>

          <div className="app__container__benefits__points__col">
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <p className="app__container__benefits__points__col__point__text">
                Экономьте ваше время
              </p>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <p className="app__container__benefits__points__col__point__text">
                Для опытных и начинающих
              </p>
            </div>
            <div className="app__container__benefits__points__col__point">
              <div className="app__container__benefits__points__col__point__plus" />
              <p className="app__container__benefits__points__col__point__text">
                Помощь от единомышленников
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Benefits
