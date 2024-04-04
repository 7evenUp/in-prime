import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { clsx } from "clsx"

import styles from "./RadioGroup.module.scss"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitive.Root
      className={clsx(styles.RadioGroup, className)}
      {...props}
      ref={forwardedRef}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <label className={styles.RadioButton}>
      <RadioGroupPrimitive.Item
        ref={forwardedRef}
        className={clsx(styles.RadioItem, className)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className={styles.Indicator} />
      </RadioGroupPrimitive.Item>
      <span className={styles.RadioLabel}>{children}</span>
    </label>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
