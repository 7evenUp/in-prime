import styles from "./styles.module.scss"

export const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.loader}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export const LoaderSmall = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.loader_small}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export const Check = () => {
  return (
    <svg
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.check}
    >
      <circle cx="39" cy="39" r="38" stroke="#FFCD9F" strokeWidth="2" />
      <g clipPath="url(#clip0_4074_18)">
        <path d="M29.9688 51.543H22V30.5108H29.9688V51.543Z" fill="#FFCD9F" />
        <path
          d="M54.5997 37.2768C55.0238 37.8411 55.2756 38.542 55.2756 39.3007C55.2756 40.4248 54.7227 41.4216 53.8753 42.0354C54.2995 42.5997 54.5512 43.3006 54.5512 44.0594C54.5512 45.1834 53.999 46.1808 53.1516 46.7946C53.5754 47.3588 53.8268 48.0596 53.8268 48.818C53.8268 50.6792 52.3126 52.1934 50.4514 52.1934H39.8252C38.0749 52.1934 36.3566 51.8818 34.718 51.2673L31.9609 50.2334V32.8024C35.1919 29.3258 38.1491 26.0075 38.6816 25.1551V21.2372C38.6816 20.4476 39.324 19.8052 40.1136 19.8052C43.3701 19.8052 46.0195 22.4546 46.0195 25.7111V27.4783L44.9517 31.1667H52.6246C54.4857 31.1667 56 32.6809 56 34.5421C56 35.6662 55.4472 36.663 54.5997 37.2768Z"
          fill="#FFCD9F"
        />
      </g>
      <defs>
        <clipPath id="clip0_4074_18">
          <rect
            width="34"
            height="34"
            fill="white"
            transform="matrix(1 0 0 -1 22 53)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export const Error = () => {
  return (
    <svg
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.errorIcon}
    >
      <circle cx="39" cy="39" r="38" stroke="#FF4A7A" strokeWidth="2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.5333 39.4359L22.8711 49.098L29.7729 55.9998L39.4351 46.3377L49.0982 56.0009L56.0001 49.099L46.3369 39.4359L55.9998 29.7729L49.098 22.8711L39.4351 32.534L29.7731 22.8721L22.8713 29.7739L32.5333 39.4359Z"
        fill="#FF4A7A"
      />
    </svg>
  )
}

export const Help = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.help}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}
