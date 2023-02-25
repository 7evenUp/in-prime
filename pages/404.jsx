import React from "react";

import Link from "next/link";

import Error404Lines from "/public/images/jsx/404/404-lines";
import Error404 from "/public/images/jsx/404/404";
import Arrow404 from "/public/images/jsx/404/404-arrow";

function PageNotFound(props) {
  return (
    <>
      <div className="app">
        <div className="content-404 relative">
            <Error404 />
            <Link href="/">
              <a>
                <div className="content-404__back-block">
                  <Arrow404 style={{ "margin-top": "7px" }} />
                  <div className="content-404__back-block__title">
                    Вернуться назад
                  </div>
                </div>
              </a>
            </Link>
            <div className="content-404__text ">Страница не найдена</div>
          </div>
        <Error404Lines />
      </div>

      <div className="back color dark"></div>
      <div className="back noise"></div>
    </>
  );
}

export default PageNotFound;
