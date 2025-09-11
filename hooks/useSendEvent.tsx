import { useCallback } from "react"
import { sendEvent as sendCryptonEvent } from "web-analytics-crypton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { User } from "@/types/id-profile-user"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const useSendEvent = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await axios.get<User>(
          `${ID_URL}/api/v1/users/profile/`
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })

  const sendEvent = useCallback(
    ({
      name,
      payload = {},
    }: {
      name: string
      payload?: Record<string, string>
    }) => {
      if (!data) {
        sendCryptonEvent({
          name,
          payload,
          email: null,
          evmWallet: null,
          telegramId: null,
          tonWallet: null,
          userId: null,
        }).catch((error) => console.log(error))
      } else {
        sendCryptonEvent({
          name,
          payload,
          email: data.email,
          evmWallet: data.wallet,
          telegramId: data.telegramId,
          tonWallet: data.tonWallet,
          userId: data.id,
        }).catch((error) => console.log(error))
      }
    },
    [data]
  )

  return { sendEvent }
}

export default useSendEvent
