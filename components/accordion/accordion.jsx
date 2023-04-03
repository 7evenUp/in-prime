import React from "react";
import { useState, useEffect } from "react";

import AccordionItem from "./accordionItem";

function Accordion(props) {
  const questionsAnswers = [
    {
      question: "Как получить подписку бесплатно?",
      answer: (
        <div className="accordion__title text">
          <p>
            Мы очень ценим активных участников нашего сообщества, поэтому
            ежемесячно вознаграждаем их бесплатной подпиской. Для этого мы
            создали систему лояльности, по которой и определяем самых активных.
            Подробнее можно узнать в{" "}
            <a
              href="https://crypton-prime.notion.site/c2c7e0fb523c43e087698c579326651c"
              target="_blank"
            >
              этой
            </a>{" "}
            статье.
          </p>
        </div>
      ),
    },
    {
      question: "Можно ли оплатить с банковской карты?",
      answer: (
        <div className="accordion__title text">
          <p>
            Напрямую — нет. Для удобства мы создали для вас полноценное
            руководство, как с начальными знаниями в криптовалюте приобрести
            подписку, имея деньги только на карте. Ознакомиться с ним можно по{" "}
            <a
              href="https://prime.crypton.xyz/buy-academy-card/"
              target="_blank"
            >
              этой
            </a>{" "}
            ссылке.
          </p>
        </div>
      ),
    },
    {
      question: "Какие гарантии окупаемости подписки?",
      answer: (
        <div className="accordion__title text">
          <p>
            В рамках нашего Prime-сообщества существуют "гарант-активности",
            заработок на которых практически обеспечен. Найти их не составит
            труда, т.к. они удобно расположены в специальной таблице.
            <br />
            <br />
            Если Вы ответственно выполняете данные активности, придерживаясь
            ключевых правил и возможностей абуза, но у Вас нет результата, то
            Вам достаточно написать наставнику и предоставить все необходимые
            доказательства участия. В случае, если Вы выполняли все
            "гарант-активности", но Вам за месяц так и не удалось окупить
            подписку по вине нашего сообщества, мы без проблем продлим Ваше
            участие на следующий месяц.
            <br />
            <br />
            Обязательно ознакомьтесь с{" "}
            <a href="https://prime.crypton.xyz/pay-guarantee/" target="_blank">
              полными условиями гарантии
            </a>
            . Если у Вас появятся вопросы, то Вы можете задать их{" "}
            <a href="https://t.me/crypton_support" target="_blank">
              Наставнику
            </a>
            .
          </p>
        </div>
      ),
    },
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
    {
      question: "Есть ли у вас подарочные сертификаты? ",
      answer: (
        <div className="accordion__title text">
          <p>
            Конечно!{" "}
            <a
              href="https://member.crypton.xyz/Crypton-Prime-270eed81f9b748c8a06b4763a47a1acd"
              target="_blank"
            >
              Здесь
            </a>{" "}
            Вы можете узнать всё о подарочных сертификатах Crypton.
          </p>
        </div>
      ),
    },
    {
      question: "Как работает Инвестиционный Фонд Crypton Prime?",
      answer: (
        <div className="accordion__title text">
          <p>
            Детальную информацию о нашем фонде Вы можете узнать{" "}
            <a href="https://prime.crypton.xyz/invest/" target="_blank">
              здесь
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      question: "Почему стоит выбрать Prime? ",
      answer: (
        <div className="accordion__title text">
          <p>
            Prime — это наше детище, которое мы любим и постоянно развиваем.
            Наша главная цель — экономия вашего времени. 24/7 наша команда ищет
            актуальные способы заработка в криптовалюте, собирая всю необходимую
            информацию в одном месте. К каждому событию прилагается пошаговая
            инструкция. Вам же остается принять решение: участвовать в том или
            ином событии или нет.
          </p>
        </div>
      ),
    },
  ];

  function toggle(current) {
    if (current == props.openFaq) {
      props.setOpenFaq(-1);
    } else {
      props.setOpenFaq(current);
    }
  }

  const renderedQuestionsAnswers = questionsAnswers.map((item, i) => {
    const state = i === props.openFaq ? true : false;
    return (
      <>
        <AccordionItem
          item={item}
          index={i}
          state={state}
          key={i}
          toggle={() => toggle(i)}
          mode={props.mode}
        />
        <div className="accordion__divider"></div>
      </>
    );
  });

  return (
    <>
      <div className="accordion__divider"></div>
      {renderedQuestionsAnswers}
    </>
  );
}

export default Accordion;
