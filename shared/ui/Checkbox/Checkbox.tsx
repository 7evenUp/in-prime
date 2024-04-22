import React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import styles from "./Checkbox.module.scss"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, id, ...props }, ref) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <CheckboxPrimitive.Root
      className={styles.CheckboxRoot}
      {...props}
      ref={ref}
      id={id}
    >
      <CheckboxPrimitive.Indicator className={styles.CheckboxIndicator}>
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4.52193L5.56296 10L12 1"
            stroke="#4AE0CE"
            strokeWidth="2"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <label className={styles.CheckboxLabel} htmlFor={id}>
      {children}
    </label>
  </div>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export default Checkbox
