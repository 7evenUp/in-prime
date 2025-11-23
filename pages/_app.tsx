import Head from "next/head"
import type { AppContext, AppInitialProps, AppProps } from "next/app"
import Providers from "@/components/Providers"
import { UserAgentProvider } from "@/providers/user-agent-provider"

import { init } from "web-analytics-crypton"

import "/styles/global.scss"

import "/styles/components/loginIdPopup.scss"
import "/styles/components/footer.scss"
import "/styles/components/accordion.scss"
import "/styles/components/features.scss"
import "/styles/components/categories.scss"
import "/styles/components/team.scss"
import "/styles/components/mobile-menu.scss"

import "/styles/pages/404.scss"

import "/components/AuthContainer/styles.css"
import "/components/AuthContainer/components/AuthByCode/styles.css"
import "/components/AuthContainer/components/AuthVariants/styles.css"
import "/components/AuthContainer/components/Divider/styles.css"
import "/components/AuthContainer/components/EmailRegister/styles.css"
import "/components/AuthContainer/components/TelegramLogin/styles.css"
import "/components/AuthContainer/shared/Button/styles.css"
import "/components/AuthContainer/shared/Checkbox/styles.css"
import "/components/AuthContainer/shared/Form/styles.css"
import "/components/AuthContainer/shared/Input/styles.css"
import "/components/AuthContainer/shared/InputOTP/styles.css"
import "/components/AuthContainer/shared/Loader/styles.css"

init({
  url: "https://api.metrics.crypton.xyz",
  client: "web",
  clientType: "landing",
  serviceName: "in-prime",
})

const App = ({
  Component,
  pageProps,
  userAgent,
}: AppProps & { userAgent: string }) => {
  return (
    <>
      <Head>
        <title>Crypton Prime</title>
        <meta name="description" content="Crypton Prime Landing" />
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
