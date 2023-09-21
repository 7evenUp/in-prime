import metamaskSrc from "@/public/images/svg/roadmap/metamask.svg"

// Данные имеют тип вида:
// [
//   {
//     top: { ################################ то, что рендерится сверху
//       imgSrc: metamaskSrc, ################ ссылка на картинку для карточки
//       title: "Ретродроп от Metamask", ##### название карточки
//       isDone: true, ####################### флаг, указывающий выполнена ли активность (фильтрацию не делал, так что желательно при заполнении данных сначала заполнять с флагом `true`, потом уже с `false`)
//       isCurrent?: true #################### флаг, указывающий на последнюю выполненную карточку. Рендерит надпись `МЫ ЗДЕСЬ` (это опциональное свойство - ставить только последней карточке с флагом { isDone: `true` })
//     },
//     bottom: { ############################# то, что рендерится снизу
//        аналогично, как для свойства `top`
//     }
//   },
//    .......
// ]

export const data = [
  {
    top: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: true,
    },
    bottom: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: true,
    },
  },
  {
    top: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: true,
    },
    bottom: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: true,
    },
  },
  {
    top: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: true,
    },
    bottom: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: true,
    },
  },
  {
    top: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: true,
      isCurrent: true
    },
    bottom: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: false,
    },
  },
  {
    top: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: false,
    },
    bottom: {
      imgSrc: metamaskSrc,
      title: "Ретродроп от Metamask",
      isDone: false,
    },
  },
]