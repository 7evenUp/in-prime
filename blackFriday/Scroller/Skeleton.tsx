import { clsx } from "clsx"

import styles from "./styles.module.css"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(styles.skeleton_original, className)} {...props} />
  )
}

export { Skeleton }
