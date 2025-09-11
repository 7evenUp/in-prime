import Head from "next/head"
import type { AppContext, AppInitialProps, AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from "react-redux"

import AuthProvider from "@/providers/auth-provider"
import { UserAgentProvider } from "@/providers/user-agent-provider"

import store from "@/redux/store"

import "/styles/global.scss"

import "/styles/components/loginIdPopup.scss"
import "/styles/components/footer.scss"
import "/styles/components/accordion.scss"
import "/styles/components/features.scss"
import "/styles/components/categories.scss"
import "/styles/components/team.scss"
import "/styles/components/mobile-menu.scss"

import "/styles/pages/404.scss"

const queryClient = new QueryClient()

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
      
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserAgentProvider ua={userAgent}>
              <Component {...pageProps} />
            </UserAgentProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ReduxProvider>
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
