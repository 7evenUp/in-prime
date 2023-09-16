import { Html, Head, Main, NextScript } from "next/document"

const Document = () => (
  <Html>
    <Head />
    <body>
      <Main />
      <NextScript />

      <script
        dangerouslySetInnerHTML={{
          __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(90995093, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
        }}
      />
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/90995093"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </body>
  </Html>
)

export default Document
