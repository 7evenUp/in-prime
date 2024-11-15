import React, { FC, useEffect, useState } from "react"
import Image from "next/image"
import * as Collapsible from "@radix-ui/react-collapsible"
import clsx from "clsx"

import Dialog from "./Dialog"

import { teamData } from "@/data/team"

import styles from "./styles.module.scss"

const FOUNDER_ANCHOR_ID = "founder"

interface TeamProps {
  teamOpened: boolean
  setTeamOpened: (opened: boolean) => void
}

const Team: FC<TeamProps> = ({ teamOpened, setTeamOpened }) => {
  useEffect(() => {
    if (location.hash === `#${FOUNDER_ANCHOR_ID}`) setTeamOpened(true)
  }, [])

  return (
    <div className="team">
      <Collapsible.Root
        className={styles.CollapsibleRoot}
        open={teamOpened}
        onOpenChange={setTeamOpened}
      >
        {/* <Collapsible.Trigger className={styles.CollapsibleTrigger}>
          <span>
            И ещё <span className={styles.highlight}>15 опытных криптанов</span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={clsx(styles.icon, teamOpened && styles.icon__active)}
          >
            <path d="M3.20921 8.90711L10.5187 16.0324C10.6471 16.1575 10.8193 16.2275 10.9986 16.2275C11.1779 16.2275 11.3501 16.1575 11.4785 16.0324L18.7907 8.90711C18.8506 8.84881 18.8982 8.77911 18.9307 8.70213C18.9632 8.62514 18.9799 8.54242 18.9799 8.45886C18.9799 8.37529 18.9632 8.29258 18.9307 8.21559C18.8982 8.1386 18.8506 8.0689 18.7907 8.01061C18.6679 7.89068 18.5031 7.82353 18.3315 7.82353C18.1598 7.82353 17.995 7.89068 17.8722 8.01061L10.9986 14.711L4.12633 8.01061C4.00361 7.89109 3.83907 7.82421 3.66777 7.82421C3.49646 7.82421 3.33193 7.89109 3.20921 8.01061C3.14933 8.0689 3.10175 8.1386 3.06925 8.21559C3.03676 8.29258 3.02002 8.37529 3.02002 8.45886C3.02002 8.54242 3.03676 8.62514 3.06925 8.70213C3.10175 8.77912 3.14933 8.84881 3.20921 8.90711Z" />
          </svg>
        </Collapsible.Trigger> */}

        <Collapsible.Content className={styles.CollapsibleContent}>
          <div className="team__container">
            {teamData.map((member) => (
              <Dialog key={member.id} {...member}>
                <Image
                  src={member.imgSrc}
                  alt={member.name}
                  className={clsx(styles.member, styles[member.id])}
                />
              </Dialog>
            ))}
          </div>
          {/* <span className={styles.remark}>
            Не забудьте кликнуть на аватары:)
          </span> */}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}

export default Team
