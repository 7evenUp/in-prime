import Head from "next/head"
import type { AppContext, AppInitialProps, AppProps } from "next/app"
import Providers from "@/components/Providers"
import { UserAgentProvider } from "@/providers/user-agent-provider"



import "/styles/global.scss"
import "/styles/demo.scss"


import "/styles/components/footer.scss"
import "/styles/components/accordion.scss"
import "/styles/components/features.scss"
import "/styles/components/categories.scss"
import "/styles/components/team.scss"
import "/styles/components/mobile-menu.scss"

import "/styles/pages/404.scss"


const App = ({
  Component,
  pageProps,
  userAgent,
}: AppProps & { userAgent: string }) => {
  return (
    <>
      <Head>
        <title>Crypton Prime</title>
        <meta name="description" content="Crypton Prime — интерактивная демонстрация проекта: версии промолендинга, подписки и кейсы." />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <Providers>
        <UserAgentProvider ua={userAgent}>
          <Component {...pageProps} />
        </UserAgentProvider>
      </Providers>
    </>
  )
}

export default App

App.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps & { userAgent: string }> => {
  const userAgent = context.ctx.req?.headers["user-agent"] || ""
  return { pageProps: {}, userAgent: userAgent }
}
