import { useMemo } from "react"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"

import { useIsTouchDevice } from "@/hooks/device"

import { NavArrowIcon } from "../Icons"

import styles from "./Advantages.module.scss"
import buySubscriptionStyles from "../BuySubscription.module.scss"

import { useAppDispatch } from "@/redux/hooks"
import { scrollToSection } from "@/redux/reducers/scrollReducer"
import { setActiveTab } from "@/redux/reducers/featuresReducer"

import { Benefit } from "@/types/api-types"

const Advantages = ({
  isCompact,
  benefits,
  order,
}: {
  isCompact?: boolean
  benefits: Benefit[]
  order?: number
}) => {
  const isTouchDevice = useIsTouchDevice()
  const HoverCardOrPopover = isTouchDevice ? Popover : HoverCard
  const dispatch = useAppDispatch()

  const neededBenefits = useMemo(() => {
    if (!benefits || benefits.length === 0) return []

    const neededBenefits = benefits.filter(
      (benefit) =>
        benefit.type === "COMMON" || benefit.type === "INCLUDE_ALL_PREVIOUS"
    )

    if (neededBenefits.length === 0) return []

    // if (isCompact) {
    //   if (order === 0) return neededBenefits.slice(1, 2)
    //   if (order === 1) return neededBenefits.slice(1, 4)
    //   if (order === 2) return neededBenefits.slice(1)
    // }

    return neededBenefits
  }, [benefits])

  if (neededBenefits.length === 0) return null

  const scrollToFeatures = () => {
    dispatch(setActiveTab("tab2"))
    scrollToSection("Возможности")
  }

  return (
    <div className={styles.advantages}>
      {neededBenefits.map((benefit) => {
        const benefitName = benefit.translations.ru.name

        return benefitName.includes(
          "Календарь актуальных крипто-активностей в одном месте"
        ) ? (
          <button
            key={benefit.id}
            className={styles.advantage_wrapper}
            onClick={scrollToFeatures}
            type="button"
          >
            {benefit.file && <img src={benefit.file} className={styles.benefitImage} alt="" width={48} height={48} />}
            <p
              className={clsx(
                styles.advantage,
                isCompact && styles.advantage_sm
              )}
            >
              {benefitName}
            </p>
          </button>
        ) : benefit.type === "INCLUDE_ALL_PREVIOUS" ? (
          <span
            key={benefit.id}
            className={buySubscriptionStyles.text_before_bonuses}
            style={{ opacity: 0.5, marginBottom: 8 }}
          >
            {order === 0 ? "Включает в себя" : benefitName}
          </span>
        ) : benefit.translations.ru.description ? (
          <HoverCardOrPopover.Root key={benefit.id} openDelay={150}>
            <HoverCardOrPopover.Trigger
              style={{ width: "100%" }}
              className={styles.Trigger}
            >
              {benefit.file && <img src={benefit.file} className={styles.benefitImage} alt="" width={48} height={48} />}
              <p
                className={clsx(
                  styles.advantage,
                  isCompact && styles.advantage_sm
                )}
              >
                {!benefit.file && "+"}{" "}
                {/* Чтоб стрелка не переносилась одна на новую строку, а вместе с последним словом */}
                {benefitName.slice(0, benefitName.length - 1)}
                <span style={{ whiteSpace: "nowrap" }}>
                  {benefitName[benefitName.length - 1]} <NavArrowIcon />
                </span>
              </p>
            </HoverCardOrPopover.Trigger>
            <HoverCardOrPopover.Portal>
              <HoverCardOrPopover.Content
                className={styles.Content}
                sideOffset={2}
                align="center"
              >
                {benefit.translations.ru.description
                  .match(/[^!.?]+[!.?]?/g)
                  .map((part, i) => (
                    <p key={i} style={{ marginBlock: 4 }}>
                      {part}
                    </p>
                  ))}
              </HoverCardOrPopover.Content>
            </HoverCardOrPopover.Portal>
          </HoverCardOrPopover.Root>
        ) : (
          <div key={benefit.id} className={styles.advantage_wrapper}>
            {benefit.file ? <img src={benefit.file} className={styles.benefitImage} alt="" width={48} height={48} /> : "+"}
            <p
              className={clsx(
                styles.advantage,
                isCompact && styles.advantage_sm
              )}
            >
              {benefitName}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Advantages
