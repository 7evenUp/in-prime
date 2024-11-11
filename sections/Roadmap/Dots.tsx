import React from "react"
import styles from "./Roadmap.module.scss"

export const DotCurrent = () => (
  <>
    <svg
      className={styles.line_top__done}
      width="62"
      height="126"
      viewBox="0 0 62 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_2418_716)">
        <circle cx="31" cy="95" r="7" fill="#FFE8B3" />
      </g>
      <circle cx="31" cy="95" r="5" fill="#FFE8B3" />
      <defs>
        <filter
          id="filter0_f_2418_716"
          x="0"
          y="65"
          width="62"
          height="62"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="12"
            result="effect1_foregroundBlur_2418_716"
          />
        </filter>
      </defs>
    </svg>
    <svg
      className={styles.line_bottom__done}
      width="62"
      height="126"
      viewBox="0 0 62 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="31"
        cy="31"
        r="5"
        transform="rotate(-180 31 31)"
        fill="#fff"
      />
    </svg>
  </>
)
export const Dot = () => {
  return (
    <>
      <svg
        className={styles.line_top__done}
        width="62"
        height="126"
        viewBox="0 0 62 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="31" cy="95" r="5" fill="#fff" />
      </svg>
      <svg
        className={styles.line_bottom__done}
        width="62"
        height="126"
        viewBox="0 0 62 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="31"
          cy="31"
          r="5"
          transform="rotate(-180 31 31)"
          fill="#fff"
        />
      </svg>
    </>
  )
}
