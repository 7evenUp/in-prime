'use client'

import { createContext, ReactNode, useContext } from 'react'

const UserAgentContext = createContext('')
export const UserAgentProvider = (data: {
  children: ReactNode
  ua: string
}): ReactNode => {
  const { children, ua } = data
  return (
    <UserAgentContext.Provider value={ua}>{children}</UserAgentContext.Provider>
  )
}

export const useUserAgent = () => {
  const context = useContext(UserAgentContext)
  if (!context)
    throw new Error('useUserAgent must be used within UserAgentProvider')
  return context
}
