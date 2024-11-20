import Head from "next/head"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from "react-redux"

import { createWeb3Modal } from "@web3modal/wagmi/react"

import { http, createConfig, WagmiProvider } from "wagmi"
import { mainnet } from "wagmi/chains"
import { walletConnect, injected } from "wagmi/connectors"

import "/styles/global.scss"

import "/styles/components/loginIdPopup.scss"
import "/styles/components/footer.scss"
import "/styles/components/accordion.scss"
import "/styles/components/features.scss"
import "/styles/components/examples.scss"
import "/styles/components/categories.scss"
import "/styles/components/team.scss"
import "/styles/components/mobile-menu.scss"

import "/styles/pages/404.scss"
import AuthProvider from "@/providers/auth-provider"
import store from "@/redux/store"

const queryClient = new QueryClient()

const projectId = process.env.NEXT_WALLET_CONNECT_PROJECT_ID || "empty"
const metadata = {
  name: "Crypton ID",
  description: "Personal Cabinet for Crypton",
  url: "https://id.crypton.xyz",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
})

createWeb3Modal({
  // @ts-ignore
  wagmiConfig: config,
  projectId,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1",
  ],
  enableAnalytics: true,
  enableOnramp: true,
  themeVariables: {
    "--w3m-z-index": 10000024,
  },
})

const App = ({ Component, pageProps }: AppProps) => (
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
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </WagmiProvider>{" "}
    </ReduxProvider>
  </>
)

export default App
