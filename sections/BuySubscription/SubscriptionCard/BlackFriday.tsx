import React from "react"
import * as Popover from "@radix-ui/react-popover"

import styles from "./blackfriday.module.css"

const BlackFriday = ({
  children,
  order,
}: {
  order: number
  children: React.ReactNode
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger className={styles.IconButton}>
        {order === 0
          ? "Подробнее о тарифе Pro"
          : order === 1
          ? "Подробнее о тарифе Prime"
          : "Включает в себя"}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.04227 5.66772L6.69377 10.202C6.77547 10.2816 6.88505 10.3262 6.99914 10.3262C7.11323 10.3262 7.22281 10.2816 7.30452 10.202L11.9578 5.66771C11.9959 5.63062 12.0261 5.58627 12.0468 5.53727C12.0675 5.48828 12.0782 5.43564 12.0782 5.38247C12.0782 5.32929 12.0675 5.27665 12.0468 5.22766C12.0261 5.17866 11.9959 5.13431 11.9578 5.09722C11.8796 5.0209 11.7747 4.97817 11.6655 4.97817C11.5563 4.97817 11.4514 5.0209 11.3733 5.09722L6.99914 9.36109L2.62589 5.09722C2.5478 5.02116 2.44309 4.9786 2.33408 4.9786C2.22507 4.9786 2.12036 5.02116 2.04227 5.09722C2.00417 5.13431 1.97388 5.17867 1.95321 5.22766C1.93253 5.27665 1.92187 5.32929 1.92187 5.38247C1.92187 5.43564 1.93253 5.48828 1.95321 5.53727C1.97388 5.58627 2.00417 5.63062 2.04227 5.66772Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="0.5"
          ></path>
        </svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={8} className={styles.Content}>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default BlackFriday
