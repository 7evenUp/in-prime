'use client'

import { useEffect, useState } from 'react'
import { getSelectorsByUserAgent } from 'react-device-detect'
import { useMediaQuery } from '@react-hookz/web'
import { useUserAgent } from '@/providers/user-agent-provider'

export const isServer = typeof window === 'undefined'

const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1280,
}

export type UserAgentSelectors = {
  isSmartTV: boolean
  isConsole: boolean
  isWearable: boolean
  isEmbedded: boolean
  isMobileSafari: boolean
  isChromium: boolean
  isMobile: boolean
  isMobileOnly: boolean
  isTablet: boolean
  isBrowser: boolean
  isDesktop: boolean
  isAndroid: boolean
  isWinPhone: boolean
  isIOS: boolean
  isChrome: boolean
  isFirefox: boolean
  isSafari: boolean
  isOpera: boolean
  isIE: boolean
  osVersion: string
  osName: string
  fullBrowserVersion: string
  browserVersion: string
  browserName: string
  mobileVendor: string
  mobileModel: string
  engineName: string
  engineVersion: string
  getUA: string
  isEdge: boolean
  isYandex: boolean
  deviceType: UserAgentDeviceType
  isIOS13: boolean
  isIPad13: boolean
  isIPhone13: boolean
  isIPod13: boolean
  isElectron: boolean
  isEdgeChromium: boolean
  isLegacyEdge: boolean
  isWindows: boolean
  isMacOs: boolean
  isMIUI: boolean
  isSamsungBrowser: false
}

export type UserAgentDeviceType =
  | 'mobile'
  | 'tablet'
  | 'browser'
  | 'smarttv'
  | 'console'
  | 'wearable'
  | 'embedded'

export function useDevice() {
  return getSelectorsByUserAgent(useUserAgent()) as UserAgentSelectors
}

export type Breakpoint = '' | 'mobile' | 'tablet' | 'laptop' | 'desktop'
export function useBreakpoint(data?: { skipSsr?: boolean }): Breakpoint {
  const device = useDevice()
  const deviceBreakpoint =
    device.isMobile && !device.isTablet
      ? 'mobile'
      : device.isTablet
      ? 'tablet'
      : 'desktop'
  const initialBreakpoint = data?.skipSsr ? '' : deviceBreakpoint
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(initialBreakpoint)

  useEffect(() => {
    function updateBreakpoint() {
      if (isServer) return

      const { DESKTOP, LAPTOP, TABLET } = BREAKPOINTS

      /* todo: rework with window.matchMedia */
      const isTablet = window.innerWidth < LAPTOP && window.innerWidth >= TABLET
      const isLaptop =
        window.innerWidth < DESKTOP && window.innerWidth >= LAPTOP
      const isDesktop = window.innerWidth >= DESKTOP

      let value = 'mobile'
      if (isTablet) value = 'tablet'
      if (isLaptop) value = 'laptop'
      if (isDesktop) value = 'desktop'

      breakpoint !== value && setBreakpoint(value as Breakpoint)
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)

    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [breakpoint])

  return breakpoint
}

export function useIsTouchDevice() {
  const device = useDevice()
  const isTouchDevice = useMediaQuery('(hover: none)')
  if (isServer) return device.isMobile || device.isTablet
  return isTouchDevice
}
