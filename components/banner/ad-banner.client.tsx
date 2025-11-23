"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"
import { useBreakpoint } from "@/hooks/device"
import { setCookie } from "cookies-next"
import { isProd } from "@/shared/helpers"
import styles from "./ad-banner.module.scss"

export type TAdBanner = {
  name: string
  url: string
  start: number
  end: number
  images: {
    mobile: { dark: string; light: string }
    desktop: { dark: string; light: string }
  }
}

const visibleToUserDelayTimeMs = 2_000
const animationVisibleTimeMs = 1_500

export const AdBanner = ({
  banner,
  cookieName: cookieName,
}: {
  banner?: TAdBanner
  cookieName: string
}) => {
  const [bannerVisible, setBannerVisible] = useState(!!banner)
  const [visibleToUser, setVisibleToUser] = useState(false)

  const device = useBreakpoint()
  const desktopOrMobile = device === "mobile" ? "mobile" : "desktop"
  const darkOrLight = "dark"

  function closeBanner() {
    const showBannerOnceIn = isProd
      ? 1000 * 60 * 60 * 24 /* 24 hours */
      : 1000 * 60 /* 1 min */
    cookieName &&
      setCookie(cookieName, 1, {
        path: "/",
        expires: new Date(Date.now() + showBannerOnceIn),
      })
    setVisibleToUser(false)
    setTimeout(() => setBannerVisible(false), animationVisibleTimeMs)
  }

  const image = banner?.images[desktopOrMobile][darkOrLight]

  useEffect(function setVisibleWithDelay() {
    setTimeout(() => setVisibleToUser(true), visibleToUserDelayTimeMs)
  }, [])

  if (!banner || !bannerVisible || !image) return null
  return (
    <div
      style={{
        zIndex: 10,
        ...(device === "mobile"
          ? { margin: "1rem" }
          : { margin: "1.5rem 2.5rem 1.5rem 0.5rem" }),
        right: 0,
        bottom: 0,
        width: device === "mobile" ? "calc(100% - 2rem)" : "20rem",
        maxWidth: "500px",
        position: "fixed",

        transition: `${animationVisibleTimeMs}ms transform ease-in, 300ms scale ease-in`,
      }}
      className={clsx([
        styles["ad-banner"],
        visibleToUser && styles["visible"],
        device === "mobile" && styles["mobile"],
      ])}
    >
      <BannerComponent image={image} onClose={closeBanner} url={banner.url} />
    </div>
  )
}

interface Props {
  url: string
  image: string
  onClose: () => void
}
const BannerComponent = ({ image, url, onClose }: Props) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          overflow: "hidden",
          borderRadius: "1rem",
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <img style={{ width: "100%" }} src={image} />
      </a>
      <div
        onClick={onClose}
        className={styles["icon"]}
        style={{
          display: "flex",
          background: "black",
          borderRadius: "50%",
          cursor: "pointer",
          top: "-1rem",
          right: "-0.3rem",
          position: "absolute",
          padding: "0.4rem",
        }}
      >
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "0.8rem" }}
        >
          <path
            d="M13.3208 1.01691L1.01359 13.3241"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M13.3208 13.3224L1.01359 1.01518"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  )
}
