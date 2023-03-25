import React from "react";
import { useState } from "react";

function Team(props) {
  const [selected, setSelected] = useState(-1);
  const [hovered, setHovered] = useState(-1);
  const scales = {
    lgg: 1,
    lg: 0.867,
    md: 0.52,
    sm: 1,
  };
  const aboutDisp = {
    lgg: {
      left: 43,
      title: 80,
      description:138
    },
    lg: {
      left: 32,
      title: 69,
      description:121
    },
    md: {
      left: 24,
      title: 30,
      description:66
    },
    sm: {
      left: 22,
      title: 26,
      description:62
    },
  }

  const currentScale = scales[props.resolution];

  const team = {
    lgg: [
      {
        size: {
          default: 272,
          selected: 272,
        },
        default_cord: {
          left: 470,
          top: 216,
        },
        selected_cord: {
          left: 394,
          top: 225,
        },
        description: {
          name: "Павел",
          role: "Основатель экосистемы Crypton ",
        },
        img: "pavel",
        change_other: {
          vadim: {
            size: 150,
            cord: { left: 214, top: 154 },
          },
          bogdan: {
            cord: { left: 418, top: 30 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          ivan: {
            cord: { left: 917, top: 214 },
          },
          aleksey: {
            cord: { left: 1062, top: 357 },
          },
          jeka: {
            cord: { left: 1142, top: 579 },
          },
          eduard: {
            cord: { left: 833, top: 470 },
          },
          aidar: {
            cord: { left: 538, top: 579 },
          },
          daniil: {
            cord: { left: 204, top: 489 },
          },
          sergey: {
            cord: { left: 41, top: 312 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 0,
          top: 49,
        },
        selected_cord: {
          left: 0,
          top: 19,
        },
        description: {
          name: "Герман",
          role: "Фидбек",
        },
        img: "german",
        change_other: {
          vadim: {
            cord: { left: 295, top: 259 },
          },
          pavel: {
            size: 150,
            cord: { left: 597, top: 312 },
          },
          bogdan: {
            cord: { left: 502, top: 30 },
          },
          karina: {
            cord: { left: 976, top: 0 },
          },
          eduard: {
            cord: { left: 800, top: 470 },
          },
          aidar: {
            cord: { left: 573, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 404,
          top: 36,
        },
        selected_cord: {
          left: 428,
          top: 30,
        },
        description: {
          name: "Богдан",
          role: "Куратор нод и редактор",
        },
        img: "bogdan",
        change_other: {
          vadim: {
            cord: { left: 190, top: 175 },
          },
          pavel: {
            size: 150,
            cord: { left: 489, top: 365 },
          },
          artem: {
            cord: { left: 900, top: 176 },
          },
          aleksey: {
            cord: { left: 1006, top: 383 },
          },
          karina: {
            cord: { left: 1031, top: 0 },
          },
          eduard: {
            cord: { left: 784, top: 515 },
          },
          aidar: {
            cord: { left: 537, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          sergey: {
            cord: { left: 26, top: 312 },
          },
          ivan: {
            cord: { left: 724, top: 298 },
          },
          nikita_k: {
            cord: { left: 1181, top: 206 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 725,
          top: 36,
        },
        selected_cord: {
          left: 620,
          top: 118,
        },
        description: {
          name: "Артём",
          role: "Партнёрства и куратор амбассадоров",
        },
        img: "artem",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 470, top: 349 },
          },
          artem: {
            cord: { left: 900, top: 176 },
          },
          aleksey: {
            cord: { left: 1102, top: 365 },
          },
          karina: {
            cord: { left: 998, top: 0 },
          },
          eduard: {
            cord: { left: 752, top: 515 },
          },
          aidar: {
            cord: { left: 517, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 890, top: 364 },
          },
          nikita_k: {
            cord: { left: 1181, top: 160 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 957,
          top: 0,
        },
        selected_cord: {
          left: 818,
          top: 0,
        },
        description: {
          name: "Карина",
          role: "Руководитель Prime",
        },
        img: "karina",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 485, top: 327 },
          },
          artem: {
            cord: { left: 597, top: 139 },
          },
          aleksey: {
            cord: { left: 986, top: 364 },
          },
          eduard: {
            cord: { left: 792, top: 504 },
          },
          aidar: {
            cord: { left: 537, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 890, top: 364 },
          },
          nikita_k: {
            cord: { left: 1181, top: 244 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          ivan: {
            cord: { left: 758, top: 299 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 1182,
          top: 139,
        },
        selected_cord: {
          left: 821,
          top: 179,
        },
        description: {
          name: "Никита",
          role: "Куратор тестнетов и редактор",
        },
        img: "nikita_k",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 475, top: 350 },
          },
          artem: {
            cord: { left: 761, top: 30 },
          },
          aleksey: {
            cord: { left: 941, top: 470 },
          },
          eduard: {
            cord: { left: 711, top: 504 },
          },
          aidar: {
            cord: { left: 505, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 603, top: 169 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          karina: {
            cord: { left: 1089, top: 0 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 27,
          top: 312,
        },
        selected_cord: {
          left: 40,
          top: 299,
        },
        description: {
          name: "Сергей",
          role: "Куратор токен-сейлов и NFT",
        },
        img: "sergey",
        change_other: {
          vadim: {
            cord: { left: 260, top: 130 },
          },
          pavel: {
            size: 150,
            cord: { left: 597, top: 237 },
          },
          artem: {
            cord: { left: 724, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 821, top: 471 },
          },
          aidar: {
            cord: { left: 639, top: 579 },
          },
          daniil: {
            cord: { left: 370, top: 528 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          nikita: {
            cord: { left: 0, top: 579 },
          },
          karina: {
            cord: { left: 976, top: 0 },
          },
          bogdan: {
            cord: { left: 477, top: 30 },
          },
        },
      },
      {
        size: {
          default: 182,
          selected: 240,
        },
        default_cord: {
          left: 210,
          top: 187,
        },
        selected_cord: {
          left: 238,
          top: 192,
        },
        description: {
          name: "Вадим",
          role: "Сооснователь Prime",
        },
        img: "vadim",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 695, top: 395 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 329 },
          },
          eduard: {
            cord: { left: 902, top: 504 },
          },
          aidar: {
            cord: { left: 538, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          ivan: {
            cord: { left: 871, top: 214 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 418, top: 15 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 0,
          top: 536,
        },
        selected_cord: {
          left: 0,
          top: 459,
        },
        description: {
          name: "Никита",
          role: "Модератор",
        },
        img: "nikita",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 615, top: 237 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 792, top: 471 },
          },
          aidar: {
            cord: { left: 591, top: 579 },
          },
          daniil: {
            cord: { left: 420, top: 384 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 283 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 237,
          top: 487,
        },
        selected_cord: {
          left: 205,
          top: 459,
        },
        description: {
          name: "Даниил",
          role: "Директор контента",
        },
        img: "daniil",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 532, top: 208 },
          },
          vadim: {
            cord: { left: 211, top: 186 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 852, top: 515 },
          },
          aidar: {
            cord: { left: 670, top: 416 },
          },
          daniil: {
            cord: { left: 420, top: 384 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 536 },
          },
        },
      },
      // {
      //   size: {
      //     default: 120,
      //     selected: 240,
      //   },
      //   default_cord: {
      //     left: 493,
      //     top: 573,
      //   },
      //   selected_cord: {
      //     left: 442,
      //     top: 459,
      //   },
      //   description: {
      //     name: "Айдар",
      //     role: "Куратор Airdrops и акций",
      //   },
      //   img: "aidar",
      //   change_other: {
      //     pavel: {
      //       size: 150,
      //       cord: { left: 519, top: 237 },
      //     },
      //     vadim: {
      //       cord: { left: 234, top: 182 },
      //     },
      //     artem: {
      //       cord: { left: 725, top: 36 },
      //     },
      //     aleksey: {
      //       cord: { left: 1134, top: 332 },
      //     },
      //     daniil: {
      //       cord: { left: 218, top: 471 },
      //     },
      //     ivan: {
      //       cord: { left: 793, top: 224 },
      //     },
      //     karina: {
      //       cord: { left: 977, top: 0 },
      //     },
      //     bogdan: {
      //       cord: { left: 417, top: 30 },
      //     },
      //     sergey: {
      //       cord: { left: 40, top: 312 },
      //     },
      //     nikita: {
      //       cord: { left: 0, top: 545 },
      //     },
      //     jeka: {
      //       cord: { left: 1074, top: 579 },
      //     },
      //     eduard: {
      //       cord: { left: 924, top: 372 },
      //     },
      //   },
      // },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 776,
          top: 486,
        },
        selected_cord: {
          left: 627,
          top: 402,
        },
        description: {
          name: "Эдуард",
          role: "Комьюнити-менеджер Prime",
        },
        img: "eduard",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 511, top: 207 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1126, top: 327 },
          },
          aidar: {
            cord: { left: 455, top: 579 },
          },
          daniil: {
            cord: { left: 225, top: 471 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1106, top: 579 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 854,
          top: 223,
        },
        selected_cord: {
          left: 681,
          top: 212,
        },
        description: {
          name: "Иван",
          role: "Главный редактор ",
        },
        img: "ivan",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 471, top: 372 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1034, top: 405 },
          },
          aidar: {
            cord: { left: 539, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1162, top: 579 },
          },
          eduard: {
            cord: { left: 817, top: 515 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 1012,
          top: 353,
        },
        selected_cord: {
          left: 840,
          top: 297,
        },
        description: {
          name: "Алексей",
          role: "Директор календаря событий",
        },
        img: "aleksey",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 463, top: 321 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1034, top: 405 },
          },
          aidar: {
            cord: { left: 458, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 669, top: 213 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1142, top: 579 },
          },
          eduard: {
            cord: { left: 669, top: 515 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 1141,
          top: 568,
        },
        selected_cord: {
          left: 820,
          top: 459,
        },
        description: {
          name: "Евгений",
          role: "Куратор NFT",
        },
        img: "jeka",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 519, top: 214 },
          },
          vadim: {
            cord: { left: 227, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1027, top: 282 },
          },
          aidar: {
            cord: { left: 451, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 820, top: 224 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          eduard: {
            cord: { left: 626, top: 422 },
          },
        },
      },
    ],
    lg: [
      {
        size: {
          default: 272,
          selected: 272,
        },
        default_cord: {
          left: 470,
          top: 216,
        },
        selected_cord: {
          left: 394,
          top: 225,
        },
        description: {
          name: "Павел",
          role: "Основатель экосистемы Crypton ",
        },
        img: "pavel",
        change_other: {
          vadim: {
            size: 150,
            cord: { left: 214, top: 154 },
          },
          bogdan: {
            cord: { left: 418, top: 30 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          ivan: {
            cord: { left: 917, top: 214 },
          },
          aleksey: {
            cord: { left: 1062, top: 357 },
          },
          jeka: {
            cord: { left: 1142, top: 579 },
          },
          eduard: {
            cord: { left: 833, top: 470 },
          },
          aidar: {
            cord: { left: 538, top: 579 },
          },
          daniil: {
            cord: { left: 204, top: 489 },
          },
          sergey: {
            cord: { left: 41, top: 312 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 0,
          top: 49,
        },
        selected_cord: {
          left: 0,
          top: 19,
        },
        description: {
          name: "Герман",
          role: "Фидбек",
        },
        img: "german",
        change_other: {
          vadim: {
            cord: { left: 295, top: 259 },
          },
          pavel: {
            size: 150,
            cord: { left: 597, top: 312 },
          },
          bogdan: {
            cord: { left: 502, top: 30 },
          },
          karina: {
            cord: { left: 976, top: 0 },
          },
          eduard: {
            cord: { left: 800, top: 470 },
          },
          aidar: {
            cord: { left: 573, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 404,
          top: 36,
        },
        selected_cord: {
          left: 428,
          top: 30,
        },
        description: {
          name: "Богдан",
          role: "Куратор нод и редактор",
        },
        img: "bogdan",
        change_other: {
          vadim: {
            cord: { left: 190, top: 175 },
          },
          pavel: {
            size: 150,
            cord: { left: 489, top: 365 },
          },
          artem: {
            cord: { left: 900, top: 176 },
          },
          aleksey: {
            cord: { left: 1006, top: 383 },
          },
          karina: {
            cord: { left: 1031, top: 0 },
          },
          eduard: {
            cord: { left: 784, top: 515 },
          },
          aidar: {
            cord: { left: 537, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          sergey: {
            cord: { left: 26, top: 312 },
          },
          ivan: {
            cord: { left: 724, top: 298 },
          },
          nikita_k: {
            cord: { left: 1181, top: 206 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 725,
          top: 36,
        },
        selected_cord: {
          left: 620,
          top: 118,
        },
        description: {
          name: "Артём",
          role: "Партнёрства и куратор амбассадоров",
        },
        img: "artem",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 470, top: 349 },
          },
          artem: {
            cord: { left: 900, top: 176 },
          },
          aleksey: {
            cord: { left: 1102, top: 365 },
          },
          karina: {
            cord: { left: 998, top: 0 },
          },
          eduard: {
            cord: { left: 752, top: 515 },
          },
          aidar: {
            cord: { left: 517, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 890, top: 364 },
          },
          nikita_k: {
            cord: { left: 1181, top: 160 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 957,
          top: 0,
        },
        selected_cord: {
          left: 818,
          top: 0,
        },
        description: {
          name: "Карина",
          role: "Руководитель Prime",
        },
        img: "karina",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 485, top: 327 },
          },
          artem: {
            cord: { left: 597, top: 139 },
          },
          aleksey: {
            cord: { left: 986, top: 364 },
          },
          eduard: {
            cord: { left: 792, top: 504 },
          },
          aidar: {
            cord: { left: 537, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 890, top: 364 },
          },
          nikita_k: {
            cord: { left: 1181, top: 244 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          ivan: {
            cord: { left: 758, top: 299 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 1182,
          top: 139,
        },
        selected_cord: {
          left: 821,
          top: 179,
        },
        description: {
          name: "Никита",
          role: "Куратор тестнетов и редактор",
        },
        img: "nikita_k",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 475, top: 350 },
          },
          artem: {
            cord: { left: 761, top: 30 },
          },
          aleksey: {
            cord: { left: 941, top: 470 },
          },
          eduard: {
            cord: { left: 711, top: 504 },
          },
          aidar: {
            cord: { left: 505, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 603, top: 169 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          karina: {
            cord: { left: 1089, top: 0 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 27,
          top: 312,
        },
        selected_cord: {
          left: 40,
          top: 299,
        },
        description: {
          name: "Сергей",
          role: "Куратор токен-сейлов и NFT",
        },
        img: "sergey",
        change_other: {
          vadim: {
            cord: { left: 260, top: 130 },
          },
          pavel: {
            size: 150,
            cord: { left: 597, top: 237 },
          },
          artem: {
            cord: { left: 724, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 821, top: 471 },
          },
          aidar: {
            cord: { left: 639, top: 579 },
          },
          daniil: {
            cord: { left: 370, top: 528 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          nikita: {
            cord: { left: 0, top: 579 },
          },
          karina: {
            cord: { left: 976, top: 0 },
          },
          bogdan: {
            cord: { left: 477, top: 30 },
          },
        },
      },
      {
        size: {
          default: 182,
          selected: 240,
        },
        default_cord: {
          left: 210,
          top: 187,
        },
        selected_cord: {
          left: 238,
          top: 192,
        },
        description: {
          name: "Вадим",
          role: "Сооснователь Prime",
        },
        img: "vadim",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 695, top: 395 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 329 },
          },
          eduard: {
            cord: { left: 902, top: 504 },
          },
          aidar: {
            cord: { left: 538, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          ivan: {
            cord: { left: 871, top: 214 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 418, top: 15 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 0,
          top: 536,
        },
        selected_cord: {
          left: 0,
          top: 459,
        },
        description: {
          name: "Никита",
          role: "Модератор",
        },
        img: "nikita",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 615, top: 237 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 792, top: 471 },
          },
          aidar: {
            cord: { left: 591, top: 579 },
          },
          daniil: {
            cord: { left: 420, top: 384 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 283 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 237,
          top: 487,
        },
        selected_cord: {
          left: 205,
          top: 459,
        },
        description: {
          name: "Даниил",
          role: "Директор контента",
        },
        img: "daniil",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 532, top: 208 },
          },
          vadim: {
            cord: { left: 211, top: 186 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 852, top: 515 },
          },
          aidar: {
            cord: { left: 670, top: 416 },
          },
          daniil: {
            cord: { left: 420, top: 384 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 536 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 493,
          top: 573,
        },
        selected_cord: {
          left: 442,
          top: 459,
        },
        description: {
          name: "Айдар",
          role: "Куратор Airdrops и акций",
        },
        img: "aidar",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 519, top: 237 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1134, top: 332 },
          },
          daniil: {
            cord: { left: 218, top: 471 },
          },
          ivan: {
            cord: { left: 793, top: 224 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1074, top: 579 },
          },
          eduard: {
            cord: { left: 924, top: 372 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 776,
          top: 486,
        },
        selected_cord: {
          left: 627,
          top: 402,
        },
        description: {
          name: "Эдуард",
          role: "Комьюнити-менеджер Prime",
        },
        img: "eduard",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 511, top: 207 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1126, top: 327 },
          },
          aidar: {
            cord: { left: 455, top: 579 },
          },
          daniil: {
            cord: { left: 225, top: 471 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1106, top: 579 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 854,
          top: 223,
        },
        selected_cord: {
          left: 681,
          top: 212,
        },
        description: {
          name: "Иван",
          role: "Главный редактор ",
        },
        img: "ivan",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 471, top: 372 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1034, top: 405 },
          },
          aidar: {
            cord: { left: 539, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1162, top: 579 },
          },
          eduard: {
            cord: { left: 817, top: 515 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 1012,
          top: 353,
        },
        selected_cord: {
          left: 840,
          top: 297,
        },
        description: {
          name: "Алексей",
          role: "Директор календаря событий",
        },
        img: "aleksey",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 463, top: 321 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1034, top: 405 },
          },
          aidar: {
            cord: { left: 458, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 669, top: 213 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1142, top: 579 },
          },
          eduard: {
            cord: { left: 669, top: 515 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 1141,
          top: 568,
        },
        selected_cord: {
          left: 820,
          top: 459,
        },
        description: {
          name: "Евгений",
          role: "Куратор NFT",
        },
        img: "jeka",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 519, top: 214 },
          },
          vadim: {
            cord: { left: 227, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1027, top: 282 },
          },
          aidar: {
            cord: { left: 451, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 820, top: 224 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          eduard: {
            cord: { left: 626, top: 422 },
          },
        },
      },
    ],
    md: [
      {
        size: {
          default: 272,
          selected: 272,
        },
        default_cord: {
          left: 470,
          top: 216,
        },
        selected_cord: {
          left: 394,
          top: 225,
        },
        description: {
          name: "Павел",
          role: "Основатель экосистемы Crypton ",
        },
        img: "pavel",
        change_other: {
          vadim: {
            size: 150,
            cord: { left: 214, top: 154 },
          },
          bogdan: {
            cord: { left: 418, top: 30 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          ivan: {
            cord: { left: 917, top: 214 },
          },
          aleksey: {
            cord: { left: 1062, top: 357 },
          },
          jeka: {
            cord: { left: 1142, top: 579 },
          },
          eduard: {
            cord: { left: 833, top: 470 },
          },
          aidar: {
            cord: { left: 538, top: 579 },
          },
          daniil: {
            cord: { left: 204, top: 489 },
          },
          sergey: {
            cord: { left: 41, top: 312 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 0,
          top: 49,
        },
        selected_cord: {
          left: 0,
          top: 19,
        },
        description: {
          name: "Герман",
          role: "Фидбек",
        },
        img: "german",
        change_other: {
          vadim: {
            cord: { left: 295, top: 259 },
          },
          pavel: {
            size: 150,
            cord: { left: 597, top: 312 },
          },
          bogdan: {
            cord: { left: 502, top: 30 },
          },
          karina: {
            cord: { left: 976, top: 0 },
          },
          eduard: {
            cord: { left: 800, top: 470 },
          },
          aidar: {
            cord: { left: 573, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 404,
          top: 36,
        },
        selected_cord: {
          left: 428,
          top: 30,
        },
        description: {
          name: "Богдан",
          role: "Куратор нод и редактор",
        },
        img: "bogdan",
        change_other: {
          vadim: {
            cord: { left: 190, top: 175 },
          },
          pavel: {
            size: 150,
            cord: { left: 489, top: 365 },
          },
          artem: {
            cord: { left: 900, top: 176 },
          },
          aleksey: {
            cord: { left: 1006, top: 383 },
          },
          karina: {
            cord: { left: 1031, top: 0 },
          },
          eduard: {
            cord: { left: 784, top: 515 },
          },
          aidar: {
            cord: { left: 537, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          sergey: {
            cord: { left: 26, top: 312 },
          },
          ivan: {
            cord: { left: 724, top: 298 },
          },
          nikita_k: {
            cord: { left: 1181, top: 206 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 725,
          top: 36,
        },
        selected_cord: {
          left: 620,
          top: 118,
        },
        description: {
          name: "Артём",
          role: "Партнёрства и куратор амбассадоров",
        },
        img: "artem",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 470, top: 349 },
          },
          artem: {
            cord: { left: 900, top: 176 },
          },
          aleksey: {
            cord: { left: 1102, top: 365 },
          },
          karina: {
            cord: { left: 998, top: 0 },
          },
          eduard: {
            cord: { left: 752, top: 515 },
          },
          aidar: {
            cord: { left: 517, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 890, top: 364 },
          },
          nikita_k: {
            cord: { left: 1181, top: 160 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 957,
          top: 0,
        },
        selected_cord: {
          left: 818,
          top: 0,
        },
        description: {
          name: "Карина",
          role: "Руководитель Prime",
        },
        img: "karina",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 485, top: 327 },
          },
          artem: {
            cord: { left: 597, top: 139 },
          },
          aleksey: {
            cord: { left: 986, top: 364 },
          },
          eduard: {
            cord: { left: 792, top: 504 },
          },
          aidar: {
            cord: { left: 537, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 890, top: 364 },
          },
          nikita_k: {
            cord: { left: 1181, top: 244 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          ivan: {
            cord: { left: 758, top: 299 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 1182,
          top: 139,
        },
        selected_cord: {
          left: 821,
          top: 179,
        },
        description: {
          name: "Никита",
          role: "Куратор тестнетов и редактор",
        },
        img: "nikita_k",
        change_other: {
          vadim: {
            cord: { left: 234, top: 182 },
          },
          pavel: {
            size: 150,
            cord: { left: 475, top: 350 },
          },
          artem: {
            cord: { left: 761, top: 30 },
          },
          aleksey: {
            cord: { left: 941, top: 470 },
          },
          eduard: {
            cord: { left: 711, top: 504 },
          },
          aidar: {
            cord: { left: 505, top: 579 },
          },
          daniil: {
            cord: { left: 252, top: 471 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          ivan: {
            cord: { left: 603, top: 169 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          karina: {
            cord: { left: 1089, top: 0 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 27,
          top: 312,
        },
        selected_cord: {
          left: 40,
          top: 299,
        },
        description: {
          name: "Сергей",
          role: "Куратор токен-сейлов и NFT",
        },
        img: "sergey",
        change_other: {
          vadim: {
            cord: { left: 260, top: 130 },
          },
          pavel: {
            size: 150,
            cord: { left: 597, top: 237 },
          },
          artem: {
            cord: { left: 724, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 821, top: 471 },
          },
          aidar: {
            cord: { left: 639, top: 579 },
          },
          daniil: {
            cord: { left: 370, top: 528 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          nikita: {
            cord: { left: 0, top: 579 },
          },
          karina: {
            cord: { left: 976, top: 0 },
          },
          bogdan: {
            cord: { left: 477, top: 30 },
          },
        },
      },
      {
        size: {
          default: 182,
          selected: 240,
        },
        default_cord: {
          left: 210,
          top: 187,
        },
        selected_cord: {
          left: 238,
          top: 192,
        },
        description: {
          name: "Вадим",
          role: "Сооснователь Prime",
        },
        img: "vadim",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 695, top: 395 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 329 },
          },
          eduard: {
            cord: { left: 902, top: 504 },
          },
          aidar: {
            cord: { left: 538, top: 579 },
          },
          daniil: {
            cord: { left: 253, top: 504 },
          },
          ivan: {
            cord: { left: 871, top: 214 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 418, top: 15 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 0,
          top: 536,
        },
        selected_cord: {
          left: 0,
          top: 459,
        },
        description: {
          name: "Никита",
          role: "Модератор",
        },
        img: "nikita",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 615, top: 237 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 792, top: 471 },
          },
          aidar: {
            cord: { left: 591, top: 579 },
          },
          daniil: {
            cord: { left: 420, top: 384 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 283 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 237,
          top: 487,
        },
        selected_cord: {
          left: 205,
          top: 459,
        },
        description: {
          name: "Даниил",
          role: "Директор контента",
        },
        img: "daniil",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 532, top: 208 },
          },
          vadim: {
            cord: { left: 211, top: 186 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1036, top: 357 },
          },
          eduard: {
            cord: { left: 852, top: 515 },
          },
          aidar: {
            cord: { left: 670, top: 416 },
          },
          daniil: {
            cord: { left: 420, top: 384 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 536 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 493,
          top: 573,
        },
        selected_cord: {
          left: 442,
          top: 459,
        },
        description: {
          name: "Айдар",
          role: "Куратор Airdrops и акций",
        },
        img: "aidar",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 519, top: 237 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1134, top: 332 },
          },
          daniil: {
            cord: { left: 218, top: 471 },
          },
          ivan: {
            cord: { left: 793, top: 224 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1074, top: 579 },
          },
          eduard: {
            cord: { left: 924, top: 372 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 776,
          top: 486,
        },
        selected_cord: {
          left: 627,
          top: 402,
        },
        description: {
          name: "Эдуард",
          role: "Комьюнити-менеджер Prime",
        },
        img: "eduard",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 511, top: 207 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 725, top: 36 },
          },
          aleksey: {
            cord: { left: 1126, top: 327 },
          },
          aidar: {
            cord: { left: 455, top: 579 },
          },
          daniil: {
            cord: { left: 225, top: 471 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1106, top: 579 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 854,
          top: 223,
        },
        selected_cord: {
          left: 681,
          top: 212,
        },
        description: {
          name: "Иван",
          role: "Главный редактор ",
        },
        img: "ivan",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 471, top: 372 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1034, top: 405 },
          },
          aidar: {
            cord: { left: 539, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 867, top: 223 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1162, top: 579 },
          },
          eduard: {
            cord: { left: 817, top: 515 },
          },
        },
      },
      {
        size: {
          default: 150,
          selected: 240,
        },
        default_cord: {
          left: 1012,
          top: 353,
        },
        selected_cord: {
          left: 840,
          top: 297,
        },
        description: {
          name: "Алексей",
          role: "Директор календаря событий",
        },
        img: "aleksey",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 463, top: 321 },
          },
          vadim: {
            cord: { left: 234, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1034, top: 405 },
          },
          aidar: {
            cord: { left: 458, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 669, top: 213 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          jeka: {
            cord: { left: 1142, top: 579 },
          },
          eduard: {
            cord: { left: 669, top: 515 },
          },
        },
      },
      {
        size: {
          default: 120,
          selected: 240,
        },
        default_cord: {
          left: 1141,
          top: 568,
        },
        selected_cord: {
          left: 820,
          top: 459,
        },
        description: {
          name: "Евгений",
          role: "Куратор NFT",
        },
        img: "jeka",
        change_other: {
          pavel: {
            size: 150,
            cord: { left: 519, top: 214 },
          },
          vadim: {
            cord: { left: 227, top: 182 },
          },
          artem: {
            cord: { left: 726, top: 36 },
          },
          aleksey: {
            cord: { left: 1027, top: 282 },
          },
          aidar: {
            cord: { left: 451, top: 579 },
          },
          daniil: {
            cord: { left: 254, top: 471 },
          },
          ivan: {
            cord: { left: 820, top: 224 },
          },
          karina: {
            cord: { left: 977, top: 0 },
          },
          bogdan: {
            cord: { left: 417, top: 30 },
          },
          sergey: {
            cord: { left: 40, top: 312 },
          },
          nikita: {
            cord: { left: 0, top: 545 },
          },
          eduard: {
            cord: { left: 626, top: 422 },
          },
        },
      },
    ],
    sm: [
      {
        size: {
          default: 120,
          selected: 120,
        },
        default_cord: {
          left: 114,
          top: 254,
        },
        selected_cord: {
          left: 59,
          top: 244,
        },
        description: {
          name: "Павел",
          role: "Основатель экосистемы Crypton ",
        },
        img: "pavel",
        change_other: {
          vadim: {
            size: 94,
            cord: { left: 153, top: 108 },
          },
          bogdan: {
            cord: { left: 273, top: 188 },
          },
          karina: {
            cord: { left: 257, top: 504 },
          },
          ivan: {
            cord: { left: 145, top: 539 },
          },
          aleksey: {
            cord: { left: 16, top: 492 },
          },
          jeka: {
            cord: { left: 0, top: 611 },
          },
          eduard: {
            cord: { left: 129, top: 407 },
          },
          aidar: {
            cord: { left: 0, top: 370 },
          },
          daniil: {
            cord: { left: 16, top: 134 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
        },
      },
      {
        size: {
          default: 78,
          selected: 120,
        },
        default_cord: {
          left: 247,
          top: 0,
        },
        selected_cord: {
          left: 87,
          top: 2,
        },
        description: {
          name: "Герман",
          role: "Фидбек",
        },
        img: "german",
        change_other: {
          vadim: {
            cord: { left: 231, top: 120 },
          },
          pavel: {
            size: 78,
            cord: { left: 124, top: 310 },
          },
          bogdan: {
            cord: { left: 241, top: 261 },
          },
          karina: {
            cord: { left: 257, top: 510 },
          },
          eduard: {
            cord: { left: 23, top: 401 },
          },
          aidar: {
            cord: { left: 0, top: 274 },
          },
          daniil: {
            cord: { left: 114, top: 180 },
          },
          sergey: {
            cord: { left: 23, top: 128 },
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 272,
          top: 215,
        },
        selected_cord: {
          left: 105,
          top: 214,
        },
        description: {
          name: "Богдан",
          role: "Куратор нод и редактор",
        },
        img: "bogdan",
        change_other: {
          vadim: {
            cord: { left: 220, top: 106 },
          },
          pavel: {
            size: 78,
            cord: { left: 105, top: 365 },
          },
          artem: {
            cord: { left: 334, top: 263 },
          },
          aleksey: {
            cord: { left: 548, top: 98 },
          },
          karina: {
            cord: { left: 257, top: 520 },
          },
          eduard: {
            cord: { left: 25, top: 456 },
          },
          aidar: {
            cord: { left: 0, top: 274 },
          },
          daniil: {
            cord: { left: 31, top: 129 },
          },
          sergey: {
            cord: { left: 124, top: 20 },
          },
          ivan: {
            cord: { left: 226, top: 433 },
          },
          nikita_k: {
            cord: { left: 203, top: 629 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          artem: {
            cord: { left: 263, top: 334 },
          },
          aleksey: {
            cord: { left: 98, top: 546 },
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 263,
          top: 360,
        },
        selected_cord: {
          left: 81,
          top: 262,
        },
        description: {
          name: "Артём",
          role: "Партнёрства и куратор амбассадоров",
        },
        img: "artem",
        change_other: {
          vadim: {
            cord: { left: 156, top: 105 },
          },
          pavel: {
            size: 78,
            cord: { left: 145, top: 432 },
          },
          aleksey: {
            cord: { left: 98, top: 544 },
          },
          karina: {
            cord: { left: 257, top: 526 },
          },
          eduard: {
            cord: { left: 14, top: 448 },
          },
          aidar: {
            cord: { left: 0, top: 351 },
          },
          daniil: {
            cord: { left: 23, top: 131 },
          },
          sergey: {
            cord: { left: 106, top: 22 },
          },
          ivan: {
            cord: { left: 259, top: 401 },
          },
          nikita_k: {
            cord: { left: 203, top: 629 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
        },
      },
      {
        size: {
          default: 78,
          selected: 120,
        },
        default_cord: {
          left: 257,
          top: 504,
        },
        selected_cord: {
          left: 60,
          top: 494,
        },
        description: {
          name: "Карина",
          role: "Руководитель Prime",
        },
        img: "karina",
        change_other: {
          vadim: {
            cord: { left: 168, top: 113 },
          },
          pavel: {
            size: 78,
            cord: { left: 129, top: 246 },
          },
          artem: {
            cord: { left: 272, top: 426 },
          },
          aleksey: {
            cord: { left: 129, top: 387 },
          },
          eduard: {
            cord: { left: 0, top: 385 },
          },
          aidar: {
            cord: { left: 16, top: 269 },
          },
          daniil: {
            cord: { left: 31, top: 121 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          ivan: {
            cord: { left: 241, top: 323 },
          },
          nikita_k: {
            cord: { left: 215, top: 629 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          ivan: {
            cord: { left: 241, top: 323 },
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 203,
          top: 629,
        },
        selected_cord: {
          left: 65,
          top: 571,
        },
        description: {
          name: "Никита",
          role: "Куратор тестнетов и редактор",
        },
        img: "nikita_k",
        change_other: {
          vadim: {
            cord: { left: 202, top: 113 },
          },
          pavel: {
            size: 78,
            cord: { left: 124, top: 223 },
          },
          artem: {
            cord: { left: 263, top: 364 },
          },
          aleksey: {
            cord: { left: 129, top: 465 },
          },
          eduard: {
            cord: { left: 19, top: 387 },
          },
          aidar: {
            cord: { left: 0, top: 265 },
          },
          daniil: {
            cord: { left: 31, top: 129 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          ivan: {
            cord: { left: 149, top: 352 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          karina: {
            cord: { left: 257, top: 493 },
          },
          jeka: {
            cord: { left: 0, top: 512 },
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 114,
          top: 20,
        },
        selected_cord: {
          left: 40,
          top: 67,
        },
        description: {
          name: "Сергей",
          role: "Куратор токен-сейлов и NFT",
        },
        img: "sergey",
        change_other: {
          vadim: {
            cord: { left: 203, top: 273 },
          },
          pavel: {
            size: 78,
            cord: { left: 79, top: 320 },
          },
          artem: {
            cord: { left: 266, top: 398 },
          },
          aleksey: {
            cord: { left: 94, top: 532 },
          },
          eduard: {
            cord: { left: 11, top: 416 },
          },
          aidar: {
            cord: { left: 137, top: 203 },
          },
          daniil: {
            cord: { left: 1, top: 213 },
          },
          ivan: {
            cord: { left: 160, top: 434 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          karina: {
            cord: { left: 257, top: 520 },
          },
          bogdan: {
            cord: { left: 272, top: 182 },
          },
        },
      },
      {
        size: {
          default: 94,
          selected: 120,
        },
        default_cord: {
          left: 168,
          top: 113,
        },
        selected_cord: {
          left: 57,
          top: 107,
        },
        description: {
          name: "Вадим",
          role: "Сооснователь Prime",
        },
        img: "vadim",
        change_other: {
          pavel: {
            size: 78,
            cord: { left: 165, top: 257 },
          },
          artem: {
            cord: { left: 263, top: 364 },
          },
          aleksey: {
            cord: { left: 90, top: 526 },
          },
          eduard: {
            cord: { left: 12, top: 426 },
          },
          aidar: {
            cord: { left: 86, top: 342 },
          },
          daniil: {
            cord: { left: 0, top: 241 },
          },
          ivan: {
            cord: { left: 173, top: 448 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          karina: {
            cord: { left: 257, top: 504 },
          },
          bogdan: {
            cord: { left: 272, top: 227 },
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 0,
          top: 0,
        },
        selected_cord: {
          left: 0,
          top: 0,
        },
        description: {
          name: "Никита",
          role: "Модератор",
        },
        img: "nikita",
        change_other: {
          vadim:{
            cord: { left: 241, top: 112 },
          },
          pavel: {
            size: 78,
            cord: { left: 120, top: 297 },
          },
          artem: {
            cord: { left: 263, top: 362 },
          },
          aleksey: {
            cord: { left: 75, top: 520 },
          },
          eduard: {
            cord: { left: 23, top: 401 },
          },
          aidar: {
            cord: { left: 0, top: 274 },
          },
          daniil: {
            cord: { left: 11, top: 145 },
          },
          ivan: {
            cord: { left: 174, top: 440 },
          },
          karina: {
            cord: { left: 257, top: 504 },
          },
          bogdan: {
            cord: { left: 247, top: 245 },
          },
          sergey: {
            cord: { left: 134, top: 183 },
          },
        },
      },
      {
        size: {
          default: 78,
          selected: 120,
        },
        default_cord: {
          left: 31,
          top: 129,
        },
        selected_cord: {
          left: 0,
          top: 100,
        },
        description: {
          name: "Даниил",
          role: "Директор контента",
        },
        img: "daniil",
        change_other: {
          pavel: {
            size: 78,
            cord: { left: 142, top: 378 },
          },
          vadim: {
            cord: { left: 129, top: 225 },
          },
          artem: {
            cord: { left: 263, top: 299 },
          },
          aleksey: {
            cord: { left: 90, top: 520 },
          },
          eduard: {
            cord: { left: 6, top: 409 },
          },
          aidar: {
            cord: { left: 0, top: 261 },
          },
          ivan: {
            cord: { left: 268, top: 409 },
          },
          karina: {
            cord: { left: 257, top: 514},
          },
          bogdan: {
            cord: { left: 273, top: 170 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 0,
          top: 274,
        },
        selected_cord: {
          left: 0,
          top: 210,
        },
        description: {
          name: "Айдар",
          role: "Куратор Airdrops и акций",
        },
        img: "aidar",
        change_other: {
          pavel: {
            size: 78,
            cord: { left: 145, top: 326 },
          },
          vadim: {
            cord: { left: 176, top: 101 },
          },
          artem: {
            cord: { left: 263, top: 370 },
          },
          aleksey: {
            cord: { left: 81, top: 520 },
          },
          daniil: {
            cord: { left: 31, top: 101 },
          },
          ivan: {
            cord: { left: 176, top: 444 },
          },
          karina: {
            cord: { left: 257, top: 504 },
          },
          bogdan: {
            cord: { left: 272, top: 201 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          jeka: {
            cord: { left: 0, top: 598 },
          },
          eduard: {
            cord: { left: 21, top: 393 },
          },
        },
      },
      {
        size: {
          default: 78,
          selected: 120,
        },
        default_cord: {
          left: 23,
          top: 401,
        },
        selected_cord: {
          left: 0,
          top: 398,
        },
        description: {
          name: "Эдуард",
          role: "Комьюнити-менеджер Prime",
        },
        img: "eduard",
        change_other: {
          pavel: {
            size: 78,
            cord: { left: 90, top: 231 },
          },
          vadim: {
            cord: { left: 168, top: 113 },
          },
          artem: {
            cord: { left: 265, top: 383 },
          },
          aleksey: {
            cord: { left: 104, top: 537 },
          },
          aidar: {
            cord: { left: -2, top: 299 },
          },
          daniil: {
            cord: { left: 26, top: 121 },
          },
          ivan: {
            cord: { left: 177, top: 321 },
          },
          karina: {
            cord: { left: 257, top: 504 },
          },
          bogdan: {
            size: 62,
            cord: { left: 272, top: 215 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          jeka: {
            cord: { left: 0, top: 598 },
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 174,
          top: 440,
        },
        selected_cord: {
          left: 46,
          top: 403,
        },
        description: {
          name: "Иван",
          role: "Главный редактор ",
        },
        img: "ivan",
        change_other: {
          pavel: {
            size: 78,
            cord: { left: 160, top: 281},
          },
          vadim: {
            cord: { left: 169, top: 101 },
          },
          artem: {
            cord: { left: 263, top: 360 },
          },
          aleksey: {
            cord: { left: 101, top: 551 },
          },
          aidar: {
            cord: { left: 78, top: 215 },
          },
          daniil: {
            cord: { left: 18, top: 101 },
          },

          karina: {
            cord: { left: 257, top: 512 },
          },
          bogdan: {
            cord: { left: 274, top: 207 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          jeka: {
            cord: { left: 0, top: 607 },
          },
          eduard: {
            cord: { left: 0, top: 307 },
          },
        },
      },
      {
        size: {
          default: 78,
          selected: 120,
        },
        default_cord: {
          left: 75,
          top: 520,
        },
        selected_cord: {
          left: 76,
          top: 497,
        },
        description: {
          name: "Алексей",
          role: "Директор календаря событий",
        },
        img: "aleksey",
        change_other: {
          pavel: {
            size: 78,
            cord: { left: 109, top: 246 },
          },
          vadim: {
            cord: { left: 168, top: 113 },
          },
          artem: {
            cord: { left: 231, top: 316 },
          },
          aleksey: {
            cord: { left: 76, top: 497 },
          },
          aidar: {
            cord: { left: 0, top: 274 },
          },
          daniil: {
            cord: { left: 31, top: 129 },
          },
          ivan: {
            cord: { left: 145, top: 393 },
          },
          karina: {
            cord: { left: 257, top: 416 },
          },
          bogdan: {
            cord: { left: 272, top: 215 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          jeka: {
            cord: { left: 0, top: 598 },
          },
          eduard: {
            cord: { left: 16, top: 403},
          },
        },
      },
      {
        size: {
          default: 62,
          selected: 120,
        },
        default_cord: {
          left: 0,
          top: 598,
        },
        selected_cord: {
          left: 0,
          top: 550,
        },
        description: {
          name: "Евгений",
          role: "Куратор NFT",
        },
        img: "jeka",
        change_other: {
          pavel: {
            size: 78,
            cord: { left: 129, top: 219 },
          },
          vadim: {
            cord: { left: 225, top: 113 },
          },
          artem: {
            cord: { left: 241, top: 372 },
          },
          aleksey: {
            cord: { left: 107, top: 460 },
          },
          aidar: {
            cord: { left: 13, top: 266 },
          },
          daniil: {
            cord: { left: 36, top: 121 },
          },
          ivan: {
            cord: { left: 123, top: 346 },
          },
          karina: {
            cord: { left: 257, top: 481 },
          },
          bogdan: {
            cord: { left: 272, top: 266 },
          },
          sergey: {
            cord: { left: 114, top: 20 },
          },
          nikita: {
            cord: { left: 0, top: 0 },
          },
          eduard: {
            cord: { left: 2, top: 382 },
          },
          nikita_k: {
            cord: { left: 272, top: 629 },
          },
        },
      },
    ],
  };

  function toggleMember(index) {
    index == selected ? setSelected(-1) : setSelected(index);
  }

  return (
    <div className="team">
      <div className="team__container">
        {team[props.resolution].map((elem, index) => {
          if (index == selected)
            return (
              <div
                className="team__container__employee"
                style={{
                  width: elem.size.selected * currentScale + "px",
                  height: elem.size.selected * currentScale + "px",
                  top: elem.selected_cord.top * currentScale + "px",
                  left: elem.selected_cord.left * currentScale + "px",
                  transition: "1s",
                }}
                onClick={() => toggleMember(index)}
              >
                <img
                  src={`/images/png/team/bg/${elem.img}-bg.png`}
                  alt=""
                  style={{
                    width: elem.size.selected * currentScale + "px",
                    top: elem.selected_cord.top * currentScale + "px",
                    left: elem.selected_cord.left * currentScale + "px",
                    transition: "1s",
                  }}
                />
                <div
                  className="team__container__employee__title"
                  style={{
                    top: aboutDisp[props.resolution].title + "px",
                    left: elem.size.selected * currentScale + aboutDisp[props.resolution].left +
                      "px",
                  }}
                >
                  {elem.description.name}
                </div>
                <div
                  className="team__container__employee__description"
                  style={{
                    top: aboutDisp[props.resolution].description + "px",
                    left: elem.size.selected * currentScale + aboutDisp[props.resolution].left +
                    "px",
                  }}
                >
                  {elem.description.role}
                </div>
              </div>
            );
          else
            return (
              <div
                className="team__container__employee"
                style={{
                  width:
                    selected >= 0 &&
                    team[props.resolution][
                      selected
                    ].change_other.hasOwnProperty(elem.img) &&
                    team[props.resolution][selected].change_other[
                      elem.img
                    ].hasOwnProperty("size")
                      ? team[props.resolution][selected].change_other[elem.img]
                          .size * currentScale
                      : elem.size.default * currentScale,
                  height:
                    selected >= 0 &&
                    team[props.resolution][
                      selected
                    ].change_other.hasOwnProperty(elem.img) &&
                    team[props.resolution][selected].change_other[
                      elem.img
                    ].hasOwnProperty("size")
                      ? team[props.resolution][selected].change_other[elem.img]
                          .size * currentScale
                      : elem.size.default * currentScale,
                  top:
                    selected >= 0 &&
                    team[props.resolution][
                      selected
                    ].change_other.hasOwnProperty(elem.img)
                      ? team[props.resolution][selected].change_other[elem.img]
                          .cord.top * currentScale
                      : elem.default_cord.top * currentScale + "px",
                  left:
                    selected >= 0 &&
                    team[props.resolution][
                      selected
                    ].change_other.hasOwnProperty(elem.img)
                      ? team[props.resolution][selected].change_other[elem.img]
                          .cord.left * currentScale
                      : elem.default_cord.left * currentScale + "px",
                  scale: hovered == index ? "1.1" : "",
                  transition: "1s",
                }}
                onClick={() => toggleMember(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(-1)}
              >
                <img
                  src={`/images/png/team/bg/${elem.img}-bg.png`}
                  alt=""
                  style={{
                    transition: "0.5s",
                    width:
                      selected >= 0 &&
                      team[props.resolution][
                        selected
                      ].change_other.hasOwnProperty(elem.img) &&
                      team[props.resolution][selected].change_other[
                        elem.img
                      ].hasOwnProperty("size")
                        ? team[props.resolution][selected].change_other[
                            elem.img
                          ].size * currentScale
                        : elem.size.default * currentScale,
                    scale: hovered == index ? "1.1" : "",
                  }}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Team;
