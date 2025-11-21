import React from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import { User } from "@/types/id-profile-user"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await axios.get<User>(
          `${ID_URL}/api/v1/users/profile/`,
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })

  return <>{children}</>
}

export default AuthProvider
