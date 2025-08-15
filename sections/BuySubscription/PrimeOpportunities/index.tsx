import clsx from "clsx"
import { Dispatch, SetStateAction } from "react"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"

import { useIsTouchDevice } from "@/hooks/device"

import PrimeOpportunitiesContent from "../PrimeOpportunitiesContent"
import { NavArrowIcon } from "../Icons"

import styles from "../BuySubscription.module.scss"

const PrimeOpportunities = ({
  open,
  setOpen,
  hideArrow,
}: {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  hideArrow?: boolean
}) => {
  const isTouchDevice = useIsTouchDevice()
  const HoverCardOrPopover = isTouchDevice ? Popover : HoverCard

  return (
    <HoverCardOrPopover.Root open={open} onOpenChange={setOpen} openDelay={150}>
      <HoverCardOrPopover.Trigger
        className={clsx(
          isTouchDevice ? styles.PopoverTrigger : styles.HoverCardTrigger,
          isTouchDevice
            ? styles.PopoverTrigger_first
            : styles.HoverCardTrigger_first
        )}
        {...(setOpen && { onClick: () => setOpen((prev) => !prev) })}
      >
        <div className={clsx(styles.bonus, styles.bonus_first)}>
          <p className={clsx(styles.text_before_bonuses)}>
            Все{" "}
            <button type="button">
              возможности Prime{" "}
              {!hideArrow && (
                <span style={{ marginLeft: "4px", marginTop: "3px" }}>
                  <NavArrowIcon />
                </span>
              )}
            </button>
          </p>
        </div>
      </HoverCardOrPopover.Trigger>
      <HoverCardOrPopover.Portal>
        <HoverCardOrPopover.Content
          className={clsx(
            isTouchDevice ? styles.PopoverContent : styles.HoverCardContent,
            isTouchDevice
              ? styles.PopoverContent_first
              : styles.HoverCardContent_first
          )}
          sideOffset={5}
        >
          <PrimeOpportunitiesContent />
        </HoverCardOrPopover.Content>
      </HoverCardOrPopover.Portal>
    </HoverCardOrPopover.Root>
  )
}

export default PrimeOpportunities
