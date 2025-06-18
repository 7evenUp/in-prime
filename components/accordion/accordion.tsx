import React, { useState } from "react"

import AccordionItem from "./accordionItem"

const leftColumnData = [
  {
    question: "Как получить подписку бесплатно?",
    answer: (
      <div className="accordion__title text">
        <p>
          Мы очень ценим активных участников сообщества, поэтому ежемесячно
          вознаграждаем самых активных бесплатной подпиской.
        </p>
      </div>
    ),
  },
  {
    question: "Можно ли оплатить подписку с банковской карты?",
    answer: (
      <div className="accordion__title text">
        <p>
          Да, можно! Доступные платежные системы: Mastercard / Visa (только для
          карт, выпущенных в РФ), Union Pay, MIR. Конвертация в рубли
          осуществляется по курсу ЦБ РФ.
        </p>
      </div>
    ),
  },
  // {
  //   question: "Какие гарантии окупаемости подписки?",
  //   answer: (
  //     <div className="accordion__title text">
  //       <p>
  //         В рамках нашего сообщества вы найдете “гарантированные события”,
  //         заработок на которых практически обеспечен. Найти их не составит
  //         труда, поскольку они удобно размещены в отдельном разделе
  //         веб-календаря.
  //         <br />
  //         <br />
  //         Если ответственно выполнять данные активности, придерживаясь ключевых
  //         правил и возможностей абуза, то вы окупите подписку. В случае, если вы
  //         выполнили все гарант. активности, но подписку так и не удалось
  //         окупить, то обязательно напишите{" "}
  //         <a href="https://t.me/crypton_support" target="_blank">
  //           Наставнику
  //         </a>
  //         , предоставив все необходимые доказательства участия. Мы продлим
  //         подписку бесплатно, начислив недостающую сумму для продления, если вы
  //         не окупились по нашей вине.
  //         <br />
  //         <br />
  //         Перед покупкой подписки удостоверьтесь, что ознакомились со{" "}
  //         <a
  //           href="https://crypton-prime.notion.site/fb0eb6869a6d4117a9203ee49c6446dc"
  //           target="_blank"
  //         >
  //           всеми деталями и условиями гарантии
  //         </a>
  //         . Любые вопросы по этой теме можно задать{" "}
  //         <a href="https://t.me/crypton_support" target="_blank">
  //           Наставнику
  //         </a>
  //         .
  //       </p>
  //     </div>
  //   ),
  // },
  {
    question: "Как сохранить за собой цену подписки?",
    answer: (
      <div className="accordion__title text">
        <p>
          Если вы приобретаете подписку по текущей цене, то фиксируете ее
          стоимость за собой навсегда. Таким образом, даже если цена будет
          повышена до 200 долларов - для вас тариф останется прежним.
          <br />
          <br />
          Единственное условие сохранения цены - это беспрерывное продление
          подписки.
        </p>
      </div>
    ),
  },
  {
    question: "Какой порог входа в сообщество?",
    answer: (
      <div className="accordion__title text">
        <p>
          Рекомендованный банк — от нескольких тысяч долларов. Заработок на
          криптовалюте требует не только время, но и зачастую денежных
          инвестиций, которые в случае получения награды возвращаются с лихвой.
          Гарантия окупа подписки действует с $500, поэтому подписываться на
          сообщество с меньшей суммой — на свой страх и риск!
          <br />
          <br />
          Отметим, заработок возможен только при соответствующих усилиях и
          действиях. Мы предоставляем всю необходимую информацию, что нужно
          делать, и следим за обновлениями, но не отрабатываем события за самих
          пользователей. Поэтому вам остается только действовать — всё остальное
          мы уже сделали за вас.
        </p>
      </div>
    ),
  },
  {
    question:
      "Появился вопрос о Prime, ответ к которому не удалось найти. К кому можно обратиться?",
    answer: (
      <div className="accordion__title text">
        <p>
          <a href="https://t.me/crypton_support" target="_blank">
            Наставник Prime
          </a>{" "}
          ответит на все ваши вопросы, связанные с подпиской.
        </p>
      </div>
    ),
  },
]

const rightColumnData = [
  {
    question: "Почему стоит выбрать Prime? ",
    answer: (
      <div className="accordion__title text">
        <p>
          Prime — это наше детище, которое мы любим и постоянно развиваем. Наша
          главная цель — экономия вашего времени. 24/7 наша команда ищет
          актуальные способы заработка в криптовалюте, собирая всю необходимую
          информацию в одном месте. К каждому событию прилагается пошаговая
          инструкция. Вам же остается принять решение: участвовать в том или
          ином событии или нет.
        </p>
      </div>
    ),
  },
  {
    question: "Как оплатить подписку?",
    answer: (
      <div className="accordion__title text">
        <p>
          Выберите тариф и оплатите его с помощью криптовалюты или банковской
          карты.
          <br />
          <br />
          Мы принимаем большинство популярных криптовалют и платежных систем как
          Mastercard / Visa (только для карт, выпущенных в РФ), Union Pay, MIR.
        </p>
      </div>
    ),
  },
  {
    question: "Есть ли возможность пообщаться напрямую с экспертами?",
    answer: (
      <div className="accordion__title text">
        <p>
          У вас будет возможность в 1 клик пообщаться напрямую с экспертами из
          нашей команды и сообщества, которые находят и публикуют события для
          заработка в Crypton Prime.
        </p>
      </div>
    ),
  },
  {
    question: "Как быстро окупается подписка?",
    answer: (
      <div className="accordion__title text">
        <p>
          От нескольких дней до нескольких месяцев, т.к. многое зависит от ваших
          стартовых знаний. Поэтому у нас и действует{" "}
          <a href="/#guarantee">гарантия окупаемости</a>
          .
          <br />
          <br />
          Очень часто всего одно событие окупает подписку Prime в несколько, а
          иногда и тысячи раз. Для большей наглядности изучите наши{" "}
          <a href="/#examples">примеры заработка</a>,{" "}
          <a href="/#testimonials">отзывы</a> и{" "}
          <a href="/#histories">Prime-истории</a>.
        </p>
      </div>
    ),
  },
]

const Accordion = ({ mode }: { mode: string }) => {
  const [openFaq, setOpenFaq] = useState(-1)

  const toggle = (currentIndex: number) => {
    currentIndex == openFaq ? setOpenFaq(-1) : setOpenFaq(currentIndex)
  }

  const leftColumn = leftColumnData.map((item, i) => (
    <AccordionItem
      key={i}
      item={item}
      isShowing={i === openFaq}
      onClick={() => toggle(i)}
      mode={mode}
    />
  ))

  const rightColumn = rightColumnData.map((item, i) => (
    <AccordionItem
      key={leftColumnData.length + i}
      item={item}
      isShowing={leftColumnData.length + i === openFaq}
      onClick={() => toggle(leftColumnData.length + i)}
      mode={mode}
    />
  ))

  return (
    <div className="accordion_container">
      <div className="accordion_left">
        <div className="accordion__divider" />
        {leftColumn}
      </div>
      <div className="accordion_right">
        <div className="accordion__divider accordion__divider__extra" />
        {rightColumn}
      </div>
    </div>
  )
}

export default Accordion
