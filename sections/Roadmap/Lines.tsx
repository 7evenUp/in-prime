import styles from "./Roadmap.module.scss"

export const VerticalLines = () => (
  <>
    <svg
      className={styles.line_top}
      width="12"
      height="101"
      viewBox="0 0 12 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path opacity="0.5" d="M6 3V95" stroke="white" />
      <circle cx="6" cy="3" r="3" fill="#D9D9D9" />
      <circle
        cx="6"
        cy="95"
        r="5"
        fill="#121212"
        stroke="white"
        strokeOpacity="0.5"
      />
    </svg>
    <svg
      className={styles.line_bottom}
      width="12"
      height="101"
      viewBox="0 0 12 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path opacity="0.5" d="M6 98L6.00001 6" stroke="white" />
      <circle
        cx="6"
        cy="98"
        r="3"
        transform="rotate(-180 6 98)"
        fill="#D9D9D9"
      />
      <ellipse
        cx="6"
        cy="6"
        rx="5"
        ry="5"
        transform="rotate(-180 6 6)"
        fill="#121212"
        stroke="white"
        strokeOpacity="0.5"
      />
    </svg>
  </>
)

export const VerticalDoneLines = () => (
  <>
    <svg
      className={styles.line_top__done}
      width="62"
      height="126"
      viewBox="0 0 62 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path opacity="0.5" d="M31 3V95" stroke="white" />
      <circle cx="31" cy="3" r="3" fill="#D9D9D9" />
      <g filter="url(#filter0_f_1687_1453)">
        <circle cx="31" cy="95" r="7" fill="#FFCD9F" />
      </g>
      <circle cx="31" cy="95" r="5" fill="#FFCD9F" />
      <defs>
        <filter
          id="filter0_f_1687_1453"
          x="0"
          y="64"
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
            result="effect1_foregroundBlur_1687_1453"
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
      <path opacity="0.5" d="M31 123L31 31" stroke="white" />
      <circle
        cx="31"
        cy="123"
        r="3"
        transform="rotate(-180 31 123)"
        fill="#D9D9D9"
      />
      <g filter="url(#filter0_f_1687_1447)">
        <circle
          cx="31"
          cy="31"
          r="7"
          transform="rotate(-180 31 31)"
          fill="#FFCD9F"
        />
      </g>
      <circle
        cx="31"
        cy="31"
        r="5"
        transform="rotate(-180 31 31)"
        fill="#FFCD9F"
      />
      <defs>
        <filter
          id="filter0_f_1687_1447"
          x="0"
          y="0"
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
            result="effect1_foregroundBlur_1687_1447"
          />
        </filter>
      </defs>
    </svg>
  </>
)
