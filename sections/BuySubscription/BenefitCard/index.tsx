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

  const benefitName = benefit.remainingCount
    ? `${benefit.name} (Осталось ${benefit.remainingCount})`
    : benefit.name

  return (
    <HoverCardOrPopover.Root open={open} onOpenChange={setOpen} openDelay={150}>
      <HoverCardOrPopover.Trigger
        style={{ width: "100%" }}
        className={clsx(
          isTouchDevice ? styles.PopoverTrigger : styles.HoverCardTrigger
        )}
        {...(setOpen && { onClick: () => setOpen((prev) => !prev) })}
      >
        <li
          className={clsx(
            styles.bonus,
            benefitName.includes("подарок") && styles.bonus_new
          )}
        >
          {
            <img
              src={benefit.file}
              className={clsx(compact ? styles.bonus_img_sm : styles.bonus_img)}
            />
          }
          <p
            className={clsx(compact ? styles.bonus_text_sm : styles.bonus_text)}
          >
            {benefit.remainingCount ? (
              <>
                {benefit.name}{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                  {`(Осталось ${benefit.remainingCount})`} <NavArrowIcon />
                </span>
              </>
            ) : (
              <>
                {benefit.name.slice(0, benefit.name.length - 1)}
                <span style={{ whiteSpace: "nowrap" }}>
                  {benefit.name[benefit.name.length - 1]} <NavArrowIcon />
                </span>
              </>
            )}
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
            <h1 className={styles.HoverCardContent_header}>{benefitName}</h1>
            {benefit.description.match(/[^!.?]+[!.?]?/g).map((part, i) => (
              <p
                key={i}
                style={{ marginBlock: 4 }}
                className={styles.HoverCardContent_text}
              >
                {part.trim()}
              </p>
            ))}
          </div>
        </HoverCardOrPopover.Content>
      </HoverCardOrPopover.Portal>
    </HoverCardOrPopover.Root>
  )
}

export default BenefitCard
