import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import ToggleLeft from "/public/images/jsx/icons/toggle-left";
import ToggleRight from "/public/images/jsx/icons/toggle-right";

const gradients = [
  "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
  "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
  "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
];

const examples = {
  июль: [
    {
      title: "Arkham",
      earn: "~$150-$1500",
      spend: "~$3",
      category: "Airdrops",
      condition:
        "За простую регистрацию можно было получить $150 в токенах ARKM. Также можно было получить по $150 за каждого приглашенного реферала",
      resources: "Время для регистрации аккаунтов и рефералов, покупка почты, прокси.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Mantle (MNT) на ByStarter",
      earn: "~$100-$1200",
      spend: "$0-2",
      category: "Token Sale",
      condition:
        "Для участия в закрытом пуле нужно было удерживать 100 токенов $BIT (~$50), в публичном $100. В закрытом пуле было выбрано 12 500 победителей, каждый из которых получил 200 токенов $MNT (~$100). В публичным пуле было выбрано ~2500 победителей, каждый из которых получил 1000 - 2200 токенов $MNT ($600 - $1200)",
      resources: "$50-100, которые нужно было похолдить.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Токенсейл NEON на Coinlist",
      earn: "~$100 - $500",
      spend: "$500",
      category: "Token Sale",
      condition: "Пользователи, которые вступили в Discord NEON до 19 мая 2023 г. получили приоритетную очередь в токенсейле, где гарантированно можно было выкупить аллокацию. NEON мы упоминали в мае 2022 года, тогда мы вступали в Discord и получали роли Neoner.",
      resources:
        "Время, чтобы дождаться своей очереди. ",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Промоакция от Bybit х NYM",
      earn: "$100",
      spend: "$1",
      category: "Airdrops",
      condition: "Для участия нужно было удерживать минимум $100, проголосовать в Byvotes и заполнить форму. 800 первых пользователей, которые заполнили форму получили по $100 в токенах $NYM каждый.",
      resources:
        "Холд $100 и минута на заполнения формы.",
      reportUrl: "crypton.xyz",
    },
  ],
  июнь: [
    {
      title: "The GRAPES",
      earn: "~$700",
      spend: "~$150",
      category: "NFT",
      condition:
        "Получить WL через активность в сообществе, заминтить 2 NFT и продать их.",
      resources: "Время для получения WL, $150 на минт и комиссии.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Open Campus",
      earn: "~$550",
      spend: "$0",
      category: "NFT",
      condition:
        "Получить WL через активность в сообществе, заминтить NFT, выбрать вариант получения всех токенов $EDU и продать их.",
      resources: "Время для получения WL.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Промоакция от OKX",
      earn: "~$150",
      spend: "$1",
      category: "Airdrops",
      condition: "Сделать депозит на биржу до $10,001 и холдить 21 день (депозит от 1000$ — 30 $USDT, от 2000$ — 50 $USDT, от 3000$ — 100 $USDT, от 10 000$ — 150 $USDT).",
      resources:
        "До $10,001 депозита для холда на бирже.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Промоакция от Bybit х ELDA",
      earn: "$15",
      spend: "$1",
      category: "Airdrops",
      condition: "Сделать объем на споте Bybit на сумму не менее 501 $USDT за время акции (с пройденным KYC 1 уровня).",
      resources:
        "Время и средства для накрутки объема на споте.",
      reportUrl: "crypton.xyz",
    },
  ],
  "май-январь": [
    {
      title: "Sui",
      earn: "$1600",
      spend: "$45",
      category: "Token Sale",
      condition:
        "Быть участником Discord проекта до 1 февраля 2023 года (первый пост в Prime о проекте был в мае 2022), заполнить форму, иметь KYC на биржах, где проводился сейл, выкупить токены и продать.",
      resources: "30 минут времени и $45 на выкуп аллокации на один аккаунт.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Mobox DragonMO",
      earn: "$400",
      spend: "$0",
      category: "NFT",
      condition:
        "Ранее получить дроп Arbitrum на кошелёк, зарегистрироваться в раффле, выиграть NFT и продать.",
      resources: "5 минут времени на один аккаунт, кошелёк с дропом ARB.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Access Protocol х Bybit",
      earn: "$230",
      spend: "$3",
      category: "Airdrop",
      condition:
        "Выполнить несложные задания, иметь UID на бирже 4, 4X или 4XX (необычно, но много кто мог забрать). Дополнительно проект раздал участникам акции по $40 на кошелёк.",
      resources:
        "30 минут времени, $3 на комиссии, $6 в токенах $ACS на стейкинг, $100 в $ACS для совершения торгового оборота или депозита на Bybit на один аккаунт.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Bursted Bubbles от Deblock",
      earn: "$470",
      spend: "$0",
      category: "NFT",
      condition:
        "Получить WL через активность в проекте или раффле, получить NFT и продать.",
      resources:
        "От 10 минут времени на один аккаунт, 0.1 $ETH на кошельке для участия в раффле.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Sui",
      earn: "$750",
      spend: "$150",
      category: "Ноды",
      condition: "Поставить ноду и попасть в 3 волну.",
      resources: "3 часа времени и $150 на сервер.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Bybit х Karate Combat ",
      earn: "$20",
      spend: "$4",
      category: "Airdrop",
      condition:
        "Внести депозит в токенах $KARATE на биржу Bybit в рамках акции.",
      resources:
        "30 минут и $170 на покупку токенов для депозита (деньги возвращаются после депозита и продажи токенов) на один аккаунт.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Spiral DAO",
      earn: "$250",
      spend: "$30",
      category: "Ретродропы",
      condition:
        "Иметь DegenScore SBT (сделать его дешево мог каждый по нашему гайду) или быть топ-1000 DeBank (также неоднократно рассказывали), заминтить токены и продать их.",
      resources: "10 минут времени и $30 на комиссии",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Aevo",
      earn: "$200",
      spend: "$0",
      category: "Ретродропы",
      condition:
        "Иметь DegenScore SBT (сделать его дешево мог каждый по нашему гайду), заполнить форму, получить пасс и продать его.",
      resources: "15 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "AIDOGE",
      earn: "$100",
      spend: "$1",
      category: "Ретродропы",
      condition: "Поставить и поддерживать ноду в течение 2 месяцев.",
      resources:
        "Ранее получить дроп ARB, заклеймить токены и продать. Ресурсы: 10 минут времени и $1 на комиссии",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Arbitrum",
      earn: "$5000",
      spend: "$20",
      category: "Ретродропы",
      condition: "Использовать протоколы блокчейна Arbitrum.",
      resources: "5 часов времени и $20 на комиссии на 1 аккаунт.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Mocaverse",
      earn: "$5000",
      spend: "$250",
      category: "NFT",
      condition:
        "Активное участие в жизни проекта, победы в различных конкурсах.",
      resources: "От 10 часов времени.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Momoguro",
      earn: "$1700",
      spend: "$390",
      category: "NFT",
      condition: "Выиграть в раффлах, получить whitelist.",
      resources: "От 10 минут в день.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Exorde",
      earn: "$1272",
      spend: "$18",
      category: "Ноды",
      condition: "Поставить и поддерживать ноду в течение 2 месяцев.",
      resources: "До 8 часов времени в течение 2 месяцев.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Aura Network",
      earn: "$450",
      spend: "$117",
      category: "Ноды",
      condition:
        "Выполнить все задания в Incentivized Testnet и отказаться от валидирования в mainnet.",
      resources: "До 16 часов времени в течение 9 месяцев.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "ZigZag",
      earn: "$150",
      spend: "$5",
      category: "Ретродропы",
      condition:
        "Cделать обмены в 4 уникальных торговых дня, где первый и последний обмены имеют разницу в один месяц.",
      resources: "15 минут, $5 на комиссии включая депозит в сеть zkSync.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "SpaceID",
      earn: "$100",
      spend: "$6",
      category: "Ретродропы",
      condition: "Купить домен на 1 год.",
      resources: "10 минут",
      reportUrl: "crypton.xyz",
    },
    {
      title: "PLAY! POP! GO!",
      earn: "$70",
      spend: "$15",
      category: "NFT",
      condition: "Выиграть в раффле.",
      resources: "2 минуты на регистрацию.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "The Dev's",
      earn: "$200",
      spend: "$15",
      category: "NFT",
      condition: "Выиграть в раффлах, получить whitelist.",
      resources: "От 10 минут в день.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Podfast на DaoMaker",
      earn: "$300",
      spend: "$100",
      category: "Token Sale",
      condition: "Держать на кошельке от $500.",
      resources: "От $500.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "XANA PENPENZ",
      earn: "$1,900",
      spend: "$0",
      category: "NFT",
      condition: "Пройти регистрацию, выполнить задания с подписками.",
      resources: "10 минут на 1 аккаунт, прогретый кошелёк и Twitter.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Puma",
      earn: "$410",
      spend: "$245",
      category: "NFT",
      condition:
        "Пройти регистрацию в розыгрыше, выполнить задания, иметь 0.05 $ETH на кошельке для участия в розыгрыше. ",
      resources: "10 минут на 1 аккаунт, прогретый кошелёк.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Modern Muse",
      earn: "$1,825",
      spend: "$0",
      category: "NFT",
      condition:
        "Пройти регистрацию в розыгрыше, выполнить задания с подписками.",
      resources: "10 минут на 1 аккаунт, прогретый кошелёк и Twitter.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Ghost Boy",
      earn: "$670",
      spend: "$45",
      category: "NFT",
      condition:
        "Проявлять активность в социальных сетях проекта, писать треды в Twitter на тему проекта, участвовать в розыгрышах. ",
      resources: "~5 минут–6 часов на 1 аккаунт",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Uniwhale",
      earn: "$125",
      spend: "$0",
      category: "Тестнет",
      condition:
        "Протестировать протокол, выполнить задания на DeQuest и иметь BAB-токен. Участники могли бесплатно заминтить Uniwhale Genesis Pass и продать его.",
      resources: "40 минут на 1 аккаунт",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Gleam & Quest3 от IF & Pine\nProtocol",
      earn: "$200",
      spend: "$50",
      category: "Whitelist",
      condition:
        "Заполнить gleam-форму и выполнить задания на площадке Quest3. Шансы на победу были высокими.",
      resources: "10 минут на 1 аккаунт.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "DigiDaigaku Dragons Superbowl",
      earn: "$700",
      spend: "$0",
      category: "NFT",
      condition:
        "Следить за первым днем Super Bowl и словить QR-код для бесплатного минта. Окно было в минуту, можно было спокойно заминтить 1 NFT.",
      resources: "2 часа на 1 аккаунт",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Planet COCO",
      earn: "$100",
      spend: "$34",
      category: "NFT",
      condition: "Зарегистрироваться.",
      resources: "10 минут на 1 аккаунт",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Kiyoshi's Seed",
      earn: "$700",
      spend: "$46",
      category: "NFT",
      condition: "Зарегистрироваться.",
      resources: "10 минут на 1 аккаунт, прогретый кошелёк и Twitter.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "NFT-whitelist Createra",
      earn: "$2300",
      spend: "$0",
      category: "NFT",
      condition: "Заполнить форму, проявлять активность в проекте.",
      resources: "От 30 минут.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Airdrop боксов NFT от Link3",
      earn: "$300",
      spend: "$0",
      category: "Airdrop",
      condition:
        "Присутствовать на голосовых сессиях проектов и собрать определенное количество W3ST-токенов. Событие можно было масштабировать для увеличения шансов на победу.",
      resources: "$0 и 3 минуты времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Senior Pass на Bybit NFT",
      earn: "$87",
      spend: "$4",
      category: "NFT",
      condition: "Успеть купить NFT.",
      resources: "$4 и 5 минут времени.",
      reportUrl: "crypton.xyz",
    },
  ],
  " 2022": [
    {
      title: "Airdrop токенов $SFP от Safepal",
      earn: "$210",
      spend: "$0",
      category: "Airdrop",
      condition:
        "Выполнить задания. Чем больше заданий выполнили, тем больше была награда.",
      resources: "15 минут на 1 аккаунт",
      reportUrl: "crypton.xyz",
    },
    {
      title: "NFT от AltLayer",
      earn: "$375",
      spend: "$100",
      category: "NFT",
      condition:
        "Выполнить задания на сайте, после чего можно было получить WL, который давал право принять участие в NFT-сейле.",
      resources: "15 минут",
      reportUrl: "crypton.xyz",
    },
    {
      title: "NFT-whitelist от Fates",
      earn: "$180",
      spend: "$0",
      category: "NFT",
      condition: "Проявлять активность в проекте.",
      resources: "5–6 часов",
      reportUrl: "crypton.xyz",
    },
    {
      title: "NFT-whitelist в Shatter-\npoint",
      earn: "$30",
      spend: "$0",
      category: "NFT",
      condition: "Проявлять активность в проекте.",
      resources: "1–2 часов",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Раффл от Hashverse",
      earn: "$330",
      spend: "$0",
      category: "NFT",
      condition:
        "Необходимо было пройти регистрацию в самом розыгрыше на Magic Eden.",
      resources: "$0 и 3 минуты времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "WL от KPRVERSE ",
      earn: "до $1500",
      spend: "$15",
      category: "NFT",
      condition: "Нужно было просто заполнить форму.",
      resources: "от $0 и 30 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Тестнет Stride",
      earn: "$150",
      spend: "$15",
      category: "Ноды",
      condition:
        "Требовалось тестировать платформу, выполнять поставленные задания и установить ноду.",
      resources: "$15 и 3 часа времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Конкурс мемов от Leech Protocol",
      earn: "до $500",
      spend: "$0",
      category: "AirDrop",
      condition:
        "Нужно было всего лишь создать мем и опубликовать его в твиттере и дискорде.",
      resources: "$0 и 10 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Ранняя активность в Lens",
      earn: "$40",
      spend: "$0",
      category: "Ретродропы",
      condition: "Требовалось просто заполнив форму.",
      resources: "$0 и 2 минуты времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Airdrop от Castaways",
      earn: "$52",
      spend: "$0",
      category: "GameFi",
      condition: "Нужно было просто играть в игру.",
      resources: "$0 и 20 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "WL в Mighty Hero Action",
      earn: "$260",
      spend: "$10",
      category: "NFT",
      condition:
        "Необходимо было заполнить форму и проявлять активность в проекте",
      resources: "$0 и 10 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Нода Aptos",
      earn: "$2400",
      spend: "от $7.5",
      category: "Ноды",
      condition:
        "Нужно было поставить ноду Aptos и принять участие в одной фазе, тем самым заполнив необходимую форму.",
      resources: "от $7.5 и 3 часов времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Раффл The Hopeful (Azra Games)",
      earn: "~$650",
      spend: "$0",
      category: "NFT",
      condition:
        "Необходимо было пройти регистрацию в самом розыгрыше на Magic Eden.",
      resources: "$0 и 3 минуты времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Викторина BNB Boost",
      earn: "до $45",
      spend: "$0",
      category: "AirDrop",
      condition: "Достаточно было ответить на вопросы викторины.",
      resources: "$0 и 10 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Тестнет KYVE",
      earn: "до $100",
      spend: "$0",
      category: "Testnet",
      condition:
        "Требовалось тестировать протокол и выполнять поставленные задания, благодаря чему вы могли попасть в таблицу лидеров.",
      resources: "$0 и ~3 часа времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Бесплатная NFT от Aptos",
      earn: "$1200",
      spend: "$0",
      category: "NFT",
      condition: "Все, что нужно было - это забрать бесплатную NFT на сайте.",
      resources: "$0 и 2 минуты времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "IEO токенов hiSAND33",
      earn: "$60",
      spend: "$140",
      category: "Token Sale",
      condition:
        "Надлежало пройти KYC на бирже KuCoin и принять участие в FCFS-распродаже токенов (кто успел, тот и купил токены).",
      resources: "$140 и 10 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Публичное SHO Sweat Economy",
      earn: "$1300",
      spend: "$500",
      category: "NFT",
      condition:
        "Нужно было держать на кошельке $500, после чего пройти регистрацию в розыгрыше.",
      resources: "$500 и 5 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Раффл Wakuland на Magic Eden",
      earn: "~$55",
      spend: "~$45",
      category: "NFT",
      condition:
        "Требовалось пройти регистрацию в самом раффле, либо выбить WhiteList через Discord.",
      resources: "$45 и 5 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Вайтлист токена hiODBS",
      earn: "$61",
      spend: "$24",
      category: "WhiteList",
      condition:
        "Достаточно было заполнить форму KuCoin и принять участие в FCFS-распродаже токенов (кто первый успел, тот и купил)",
      resources: "$10 и 10 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Тестнет Canto",
      earn: "до $3400",
      spend: "$0",
      category: "Testnet",
      condition:
        "Требовалось заполнить форму-заявку, благодаря которой у вас появлялась возможность запросить тестовые токены в сети Canto.",
      resources: "15 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Распродажа NFT-Egg",
      earn: "~15 $SOL",
      spend: "6.97 $SOL",
      category: "NFT Sale",
      condition:
        "Принять участие в продаже NFT на MechaFightClub. Начальные цены NFT составляли приблизительно 6.969 $SOL, а итоговый заработок зависел от редкости NFT.",
      resources: "6.969 SOL (270$ на момент сейла) и 2 минуты времени.",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Вайтлист OG Badge",
      earn: "до $600",
      spend: "$0",
      category: "Whitelist",
      condition:
        "Нужно было заполнить форму, выполнив простые задания. После этого победители, которые попали в WhiteList, приняли участие в распродаже NFT на AltLayer.",
      resources: "5 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Продажа токенов hiSAND33",
      earn: "$210",
      spend: "$140",
      category: "Token Sale",
      condition:
        "Нужно было купить токены hiSAND33 на бирже KuCoin в формате FCFS, что значит “кто первый кликнул = тот и купил”.",
      resources: "$140 и 2 минуты времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Игровой ивент от Pikaster",
      earn: "от $40",
      spend: "$0",
      category: "Play-to-Earn",
      condition:
        "Достаточно было сыграть в саму игру и активно продвигаться в рейтинге. Стартовые вложения не требовались.",
      resources: "5-6 часов времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "IGO Binance's 5th Anniversary",
      earn: "$170",
      spend: "~$2",
      category: "NFT Sale",
      condition:
        "Нужно было удерживать 0.1 $BNB на спотовом кошельке аккаунта Binance, после чего выкупить билеты для участия в розыгрыше. 1 билет стоил 2 $BUSD, максимум 4 билета на аккаунт.",
      resources: "0.1 $BNB, 2–8 $BUSD и 5 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Публичное SHO beFITTER",
      earn: "$2000+",
      spend: "$200",
      category: "Token Sale",
      condition:
        "Перед событием достаточно было удерживать не менее $2500 в виде любых токенов на своем кошельке.",
      resources: "$2500 и 5 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Публичное SHO beFITTER",
      earn: "$150",
      spend: "~$10",
      category: "NFT Sale",
      condition:
        "Необходимо было удерживать 0.1 $BNB на спотовом кошельке аккаунта Binance, после чего выкупить билеты для участия в розыгрыше. 1 билет стоил 10 $BUSD, максимум 1 билет на аккаунт.",
      resources: "0.1 $BNB, 10 $BUSD и 5 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Раффл от Ledger",
      earn: "0.5 $ETH",
      spend: "0.3 $ETH",
      category: "NFT Sale",
      condition:
        "Требовалось иметь на вашем кошельке минимум 0.1337 $ETH ( ~$420), а также выполнить задания. В случае победы в розыгрыше вам предстояло выкупить NFT за 0.3 $ETH.",
      resources: "0.3 $ETH ( ~160$) и 5 минут вашего времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Раффл от POTATOZ",
      earn: "~1.7 $ETH",
      spend: "$0",
      category: "NFT Sale",
      condition:
        "Достаточно было иметь на кошельке 0.069 $ETH (~100$), после чего выполнить все задания. В случае победы в розыгрыше у вас появлялась возможность бесплатно заминить NFT на MEMELAND.",
      resources: "0.069 $ETH (~100$) и 5 минут вашего времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "Token Sale проекта CUBE",
      earn: "$1500",
      spend: "$50",
      category: "Token Sale",
      condition:
        "Достаточно было совершить торговый оборот на сумму не менее $500, а также удерживать на спотовом кошельке Huobi $100, после чего случайным образом выбирали победителей, которые смогут выкупить аллокацию в $50.",
      resources: "$110 и 10 минут времени",
      reportUrl: "crypton.xyz",
    },
    {
      title: "IEO проекта Walken",
      earn: "$120",
      spend: "$12.5",
      category: "Token Sale",
      condition:
        "Нужно было удерживать 100 $USDT на спотовом кошельке аккаунта ByBit, после чего выиграть аллокацию.",
      resources: "$100 и 5 минут времени",
      reportUrl: "crypton.xyz",
    },
  ],
};

const spaces = {
  lgg: 50,
  lg: 50,
  md: 52,
  sm: 20,
};

const width = {
  lgg: 400,
  lg: 400,
  md: 400,
  sm: 270,
};

function Examples(props) {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [showDescription, setShowDescription] = useState(-1);

  const swiperRef = useRef(null);
  swiperRef.current?.swiper.slideTo(currentBlock);

  function changeBlock(index) {
    setCurrentBlock(index);
  }

  function toggleMonth(monthIndex) {
    if (currentMonth == monthIndex) {
      setCurrentMonth(0);
      setCurrentBlock(0);
      setShowDescription(-1);
    } else {
      setCurrentMonth(monthIndex);
      setCurrentBlock(0);
      setShowDescription(-1);
    }
  }

  function toggleBlock(action) {
    if (
      action == "up" &&
      currentBlock < Object.entries(examples)[currentMonth][1].length - 1
    ) {
      setCurrentBlock(currentBlock + 1);
      setShowDescription(-1);
    } else if (action == "down" && currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
      setShowDescription(-1);
    }
  }

  function toggleDescription(currentDescription) {
    if (showDescription == currentDescription) {
      setShowDescription(-1);
    } else {
      setShowDescription(currentDescription);
    }
  }

  // console.log(Object.entries(examples)[currentMonth]);

  let current_gradient = 0;

  return (
    <div className="examples-content">
      <div className="examples-content__header">
        <div className="examples-content__header__months">
          {Object.keys(examples).map((elem, index) => {
            return (
              <div
                className="examples-content__header__months__month "
                style={{ opacity: `${index != currentMonth ? 0.5 : 1}` }}
                onClick={() => toggleMonth(index)}
              >
                {elem}
              </div>
            );
          })}
        </div>

        {["lgg", "lg"].includes(props.resolution) ? (
          <div className="examples-content__header__toggle">
            <div
              className="examples-content__header__toggle__arrow"
              onClick={() => toggleBlock("down")}
            >
              <ToggleLeft opacity={currentBlock == 0 ? 0.5 : 1} />
            </div>

            <div className="examples-content__header__toggle__elem ">{`${currentBlock + 1
              }/${Object.entries(examples)[currentMonth][1].length}`}</div>

            <div
              className="examples-content__header__toggle__arrow"
              onClick={() => toggleBlock("up")}
            >
              <ToggleRight
                opacity={
                  currentBlock ==
                    Object.entries(examples)[currentMonth][1].length - 1
                    ? 0.5
                    : 1
                }
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => changeBlock(swiper.activeIndex)}
        initialSlide={currentBlock}
        className="examples-content__blocks"
        modules={[Pagination]}
        spaceBetween={spaces[props.resolution]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ width: width[props.resolution] }}
      >
        {Object.entries(examples)[currentMonth][1].map((elem, index) => {
          if (current_gradient > gradients.length - 1) {
            current_gradient = 0;
          }

          const swiper_slide = (
            <SwiperSlide
              className="examples-content__blocks__block"
              key={currentMonth + index}
              style={{
                opacity: index < currentBlock ? 0 : 1,
                transition: "0.35s",
              }}
            >
              <div
                className="examples-content__blocks__block__gradient"
                style={{ background: gradients[current_gradient] }}
              ></div>
              <div className="examples-content__blocks__block__content">
                <div className="examples-content__blocks__block__content__title ">
                  {elem.title}
                </div>
                <div className="examples-content__blocks__block__content__in-out">
                  <div className="examples-content__blocks__block__content__in-out__col">
                    <div className="examples-content__blocks__block__content__in-out__col__title">
                      Заработано:
                    </div>
                    <div className="examples-content__blocks__block__content__in-out__col__sum">
                      {elem.earn}
                    </div>
                  </div>

                  <div className="examples-content__blocks__block__content__in-out__col out">
                    <div className="examples-content__blocks__block__content__in-out__col__title">
                      Вложения:
                    </div>
                    <div className="examples-content__blocks__block__content__in-out__col__sum">
                      {elem.spend}
                    </div>
                  </div>
                </div>

                <div className="examples-content__blocks__block__content__cat-and-more">
                  <div className="examples-content__blocks__block__content__cat-and-more__cat">
                    {elem.category}
                  </div>
                  <div
                    className="examples-content__blocks__block__content__cat-and-more__more toggle"
                    onClick={() => toggleDescription(index)}
                  >
                    {showDescription == index ? "Скрыть" : "Подробнее"}
                  </div>
                </div>

                <div
                  className="examples-content__blocks__block__content__extended-info"
                  aria-expanded={showDescription != index}
                >
                  <div className="examples-content__blocks__block__content__extended-info__condition-title">
                    Условия:
                  </div>
                  <div className="examples-content__blocks__block__content__extended-info__condition-description">
                    {elem.condition}
                  </div>
                  <div className="examples-content__blocks__block__content__extended-info__resources-title">
                    Ресурсы:
                  </div>
                  <div className="examples-content__blocks__block__content__extended-info__resources-description">
                    {elem.resources}
                  </div>
                  {/* <a href={elem.reportUrl}>
                <div className="examples-content__blocks__block__content__extended-info__full-report">
                  <div className="examples-content__blocks__block__content__extended-info__full-report__text">
                    Полный отчет
                  </div>
                  <div className="examples-content__blocks__block__content__extended-info__full-report__arrow"></div>
                </div>
              </a> */}
                </div>
              </div>
            </SwiperSlide>
          );
          current_gradient++;
          return swiper_slide;
        })}
      </Swiper>

      {["md", "sm"].includes(props.resolution) ? (
        <div className="examples-content__header__toggle">
          <div
            className="examples-content__header__toggle__arrow"
            onClick={() => toggleBlock("down")}
          >
            <ToggleLeft opacity={currentBlock == 0 ? 0.5 : 1} />
          </div>

          <div className="examples-content__header__toggle__elem ">{`${currentBlock + 1
            }/${Object.entries(examples)[currentMonth][1].length}`}</div>

          <div
            className="examples-content__header__toggle__arrow"
            onClick={() => toggleBlock("up")}
          >
            <ToggleRight
              opacity={
                currentBlock ==
                  Object.entries(examples)[currentMonth][1].length - 1
                  ? 0.5
                  : 1
              }
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Examples;
