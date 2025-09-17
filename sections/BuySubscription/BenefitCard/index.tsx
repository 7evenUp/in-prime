import React, { useMemo, useState } from "react"
import { Dispatch, SetStateAction } from "react"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"

import { useIsTouchDevice } from "@/hooks/device"

import { NavArrowIcon } from "../Icons"

import styles from "../BuySubscription.module.scss"

const BenefitCard = ({
  benefit,
  compact,
  open: outerOpen,
  setOpen: outerSetIsOpen,
}: {
  benefit: {
    file: string
    name: string
    description: string
    remainingCount?: number
  }
  compact?: boolean
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const isTouchDevice = useIsTouchDevice()
  const HoverCardOrPopover = isTouchDevice ? Popover : HoverCard

  // Mobile bug fix
  const [localOpen, localSetOpen] = useState(false)
  const [open, setOpen] = useMemo(
    () =>
      outerSetIsOpen ? [outerOpen, outerSetIsOpen] : [localOpen, localSetOpen],
    [outerOpen, outerSetIsOpen, localOpen, localSetOpen]
  )

  return (
    <HoverCardOrPopover.Root open={open} onOpenChange={setOpen} openDelay={150}>
      <HoverCardOrPopover.Trigger
        style={{ width: "100%" }}
        className={clsx(
          isTouchDevice ? styles.PopoverTrigger : styles.HoverCardTrigger
        )}
        {...(setOpen && { onClick: () => setOpen((prev) => !prev) })}
      >
        <li className={styles.bonus}>
          {
            <img
              src={benefit.file}
              className={clsx(compact ? styles.bonus_img_sm : styles.bonus_img)}
            />
          }
          <p
            className={clsx(compact ? styles.bonus_text_sm : styles.bonus_text)}
          >
            {benefit.name}
            {benefit.remainingCount && ` (${benefit.remainingCount})`}
            <span style={{ marginLeft: "6px" }}>
              <NavArrowIcon />
            </span>
          </p>
        </li>
      </HoverCardOrPopover.Trigger>
      <HoverCardOrPopover.Portal>
        <HoverCardOrPopover.Content
          className={styles.HoverCardContent}
          sideOffset={compact ? 2 : 4}
          align="center"
        >
          <div className={styles.HoverCardImage}>
            <img className={styles.HoverCardImage_img} src={benefit.file} />
          </div>
          <div>
            <h1 className={styles.HoverCardContent_header}>{benefit.name}</h1>
            <p className={styles.HoverCardContent_text}>
              {benefit.description}
            </p>
          </div>
        </HoverCardOrPopover.Content>
      </HoverCardOrPopover.Portal>
    </HoverCardOrPopover.Root>
  )
}

export default BenefitCard
