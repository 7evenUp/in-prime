import metamaskSrc from "@/public/images/svg/roadmap/metamask.svg"
import aptosSrc from "@/public/images/svg/roadmap/aptos.svg"
import arbitrumSrc from "@/public/images/svg/roadmap/arbitrum.svg"
import suiSrc from "@/public/images/svg/roadmap/sui.svg"
import cantoSrc from "@/public/images/svg/roadmap/canto.svg"
import arkhamSrc from "@/public/images/svg/roadmap/arkham.svg"
import layerzeroSrc from "@/public/images/svg/roadmap/layer_zero.svg"
import partyDAOSrc from "@/public/images/svg/roadmap/party_dao.svg"
import zkSyncSrc from "@/public/images/svg/roadmap/zksync.svg"
import starknetSrc from "@/public/images/svg/roadmap/starknet.svg"
import zoraSrc from "@/public/images/svg/roadmap/zora.svg"
import lineaSrc from "@/public/images/svg/roadmap/linea.svg"

// Данные имеют тип вида:
// [
//   {
//     top: { ################################ то, что рендерится сверху
//       imgSrc: metamaskSrc, ################ ссылка на картинку для карточки
//       title: "Ретродроп от Metamask", ##### название карточки
//       isDone: true, ####################### флаг, указывающий выполнена ли активность (фильтрацию не делал, так что желательно при заполнении данных сначала заполнять с флагом `true`, потом уже с `false`)
//       isBlured: true ###################### флаг, указывающий, будет ли элемент заблюрен (это опциональное свойство)
//       earned: number ###################### кол-во заработанных денег
//       description: string ################# описание проекта (выезжающая панель снизу)
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
      imgSrc: cantoSrc,
      title: "Canto",
      isDone: true,
      earned: 3400,
      description: "Участвовали в тестнете и получили за это ретродроп.",
    },
    bottom: {
      imgSrc: aptosSrc,
      title: "Aptos",
      isDone: true,
      earned: 3600,
      description:
        "Ставили ноду Aptos по нашему руководству, попали в одну из фаз, заполнили форму и получили токены. Также в рамках активности можно было просто заминтить NFT, за которую команда начислила токены проекта на $1200.",
    },
  },
  {
    top: {
      imgSrc: arbitrumSrc,
      title: "Arbitrum",
      isDone: true,
      earned: 5000,
      description:
        "Были уверены в ретродропе от Arbitrum, отрабатывали эту активность по нашим руководствам и получили ретродроп на круглую сумму.",
    },
    bottom: {
      imgSrc: suiSrc,
      title: "Sui",
      isDone: true,
      earned: 2350,
      description:
        "Получили вайтлист к токенсейлу за раннее вступление в Discord проекта и успешно поучаствовали в нем. Также ставили ноду и получили за это токены проекта.",
    },
  },
  {
    top: {
      imgSrc: arkhamSrc,
      title: "Arkham",
      isDone: true,
      earned: 1500,
      description:
        "Участвовали в кампании по приглашению пользователей на сайт и получили за это дроп.",
      isCurrent: true,
    },
    bottom: {
      imgSrc: layerzeroSrc,
      title: "LayerZero",
      isDone: false,
      description:
        "Максимально отрабатываем этот проект по авторской стратегии Даниила, нашего автора и эксперта по ретродропам.",
    },
  },
  {
    top: {
      imgSrc: partyDAOSrc,
      title: "PartyDAO",
      isDone: false,
      description:
        "В рамках проекта создаем “party”, участвуя в которых вы получаете больше шансов на дроп от проекта за взаимодействие с ним при минимальных затратах на отработку. В них может поучаствовать каждый подписчик Prime.",
    },
    bottom: {
      imgSrc: zkSyncSrc,
      title: "zkSync",
      isDone: false,
      description:
        "Дроп неизбежен, особенно для подписчиков Prime, которые отрабатывают проект еще с сентября 2021.",
    },
  },
  {
    top: {
      imgSrc: starknetSrc,
      title: "Starknet",
      isDone: false,
      description:
        "Проект собрал $900 000 000 инвестиций, не имеет своего токена. Мы ожидаем, что будет бесплатная раздача токенов ранним пользователям.",
    },
    bottom: {
      imgSrc: aptosSrc,
      title: "Aptos",
      isDone: false,
      isBlured: true,
      description:
        "Считаем, что у этого проекта будет второй дроп. Подробный разбор с инструкциями сделали в Prime.",
    },
  },
  {
    top: {
      imgSrc: zoraSrc,
      title: "Zora",
      isDone: false,
      isBlured: true,
      description:
        "Токен проекта подтвержден, поэтому это только вопрос времени.",
    },
    bottom: {
      imgSrc: lineaSrc,
      title: "Linea",
      isDone: false,
      isBlured: true,
      description:
        "Официально токен не подтвержден, но судя по Roadmap, в 3 фазе планируется “децентрализованное управление сообществом”, данный пункт может указывать, что токен всё же будет. Поэтому уже проявляем активность в проекте для получения дропа.",
    },
  },
]
