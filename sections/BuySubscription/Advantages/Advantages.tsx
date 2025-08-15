import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"

import { useIsTouchDevice } from "@/hooks/device"

import { NavArrowIcon } from "../Icons"

import { advantages_start, advantages_pro, advantages_prime } from "./data"

import styles from "./Advantages.module.scss"

const Advantages = ({ order }: { order: number }) => {
  const isTouchDevice = useIsTouchDevice()
  const HoverCardOrPopover = isTouchDevice ? Popover : HoverCard

  return (
    <div className={styles.advantages}>
      {order === 0 &&
        advantages_start.map((advantage) =>
          advantage.name ===
          "Календарь актуальных крипто-активностей в одном месте" ? (
            <>
              <HoverCardOrPopover.Root openDelay={150}>
                <HoverCardOrPopover.Trigger
                  style={{ width: "100%" }}
                  className={styles.Trigger}
                >
                  <CalendarIcon className={styles.calendar_icon} />
                  <p className={styles.advantage}>
                    {advantage.name} <NavArrowIcon />
                  </p>
                </HoverCardOrPopover.Trigger>
                <HoverCardOrPopover.Portal>
                  <HoverCardOrPopover.Content
                    className={styles.Content}
                    sideOffset={2}
                    align="center"
                  >
                    <p>{advantage.description}</p>
                  </HoverCardOrPopover.Content>
                </HoverCardOrPopover.Portal>
              </HoverCardOrPopover.Root>
              <p className={styles.advantage_additional}>Включает в себя:</p>
            </>
          ) : advantage.description ? (
            <HoverCardOrPopover.Root openDelay={150}>
              <HoverCardOrPopover.Trigger
                style={{ width: "100%" }}
                className={styles.Trigger}
              >
                <p className={styles.advantage}>
                  + {advantage.name} <NavArrowIcon />
                </p>
              </HoverCardOrPopover.Trigger>
              <HoverCardOrPopover.Portal>
                <HoverCardOrPopover.Content
                  className={styles.Content}
                  sideOffset={2}
                  align="center"
                >
                  <p>{advantage.description}</p>
                </HoverCardOrPopover.Content>
              </HoverCardOrPopover.Portal>
            </HoverCardOrPopover.Root>
          ) : (
            <p className={styles.advantage}>+ {advantage.name}</p>
          )
        )}
      {order === 1 &&
        advantages_pro.map((advantage) =>
          advantage.description ? (
            <HoverCardOrPopover.Root openDelay={150}>
              <HoverCardOrPopover.Trigger
                style={{ width: "100%" }}
                className={styles.Trigger}
              >
                <p className={styles.advantage}>
                  + {advantage.name} <NavArrowIcon />
                </p>
              </HoverCardOrPopover.Trigger>
              <HoverCardOrPopover.Portal>
                <HoverCardOrPopover.Content
                  className={styles.Content}
                  sideOffset={2}
                  align="center"
                >
                  <p>{advantage.description}</p>
                </HoverCardOrPopover.Content>
              </HoverCardOrPopover.Portal>
            </HoverCardOrPopover.Root>
          ) : (
            <p className={styles.advantage}>+ {advantage.name}</p>
          )
        )}
      {order === 2 &&
        advantages_prime.map((advantage) =>
          advantage.description ? (
            <HoverCardOrPopover.Root openDelay={150}>
              <HoverCardOrPopover.Trigger
                style={{ width: "100%" }}
                className={styles.Trigger}
              >
                <p className={styles.advantage}>
                  + {advantage.name} <NavArrowIcon />
                </p>
              </HoverCardOrPopover.Trigger>
              <HoverCardOrPopover.Portal>
                <HoverCardOrPopover.Content
                  className={styles.Content}
                  sideOffset={2}
                  align="center"
                >
                  <p>{advantage.description}</p>
                </HoverCardOrPopover.Content>
              </HoverCardOrPopover.Portal>
            </HoverCardOrPopover.Root>
          ) : (
            <p className={styles.advantage}>+ {advantage.name}</p>
          )
        )}
    </div>
  )
}

export default Advantages

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="32"
    height="31"
    viewBox="0 0 32 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M5.77813 0V2.32569H1.79804C0.806756 2.32569 0 3.13209 0 4.12338V29.1787C0 30.17 0.806756 30.9767 1.79804 30.9767H30.202C31.1932 30.9767 32 30.17 32 29.1787V4.12338C32 3.13209 31.1932 2.32533 30.202 2.32533H26.2222V0H23.6174V2.32569H8.38258V0H5.77813ZM8.62364 18.4018C5.64693 18.4018 8.62364 18.4018 5.64693 18.4018V15.4286H8.62364V18.4018ZM8.64213 22.8224V25.7991C5.66542 25.7991 8.64213 25.7991 5.66542 25.7991V22.8224H8.64213ZM17.334 18.4018C14.3573 18.4018 17.334 18.4018 14.3573 18.4018V15.4286H17.334V18.4018ZM17.3529 22.8224V25.7991C14.3762 25.7991 17.3529 25.7991 14.3762 25.7991V22.8224H17.3529ZM26.0487 18.4018C23.072 18.4018 26.0487 18.4018 23.072 18.4018V15.4286H26.0487V18.4018ZM26.0672 22.8224V25.7991C23.0905 25.7991 26.0672 25.7991 23.0905 25.7991V22.8224H26.0672ZM30.0793 11.5328H29.3956H2.6048H1.92142V8.928H2.6048H29.3956H30.0793V11.5328Z"
      fill="currentColor"
    />
  </svg>
)
