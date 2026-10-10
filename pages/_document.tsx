import { Html, Head, Main, NextScript } from "next/document"

const Document = () => (
  <Html className="dark" lang="ru">
    <Head>
      <link rel="stylesheet" href="/demo/legacy.css" />
      <link rel="stylesheet" href="/demo/redesign.css" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
