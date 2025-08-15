import clsx from "clsx"

import { BotIcon, CommunityIcon } from "../Icons"

import {
  CalendarIcon,
  ChatIcon,
  ContentIcon,
  HelperIcon,
} from "@/sections/Features/Icons"

import styles from "../BuySubscription.module.scss"

const PrimeOpportunitiesContent = () => {
  return (
    <div className={styles.text_before_bonuses_wrap}>
      <AbilityItem icon={ContentIcon} text="Контент о заработке" />
      <AbilityItem icon={CalendarIcon} text="Crypton Drops Calendar" />
      <AbilityItem icon={BotIcon} text="Runner bot - коллы на мемкоины" />
      <AbilityItem icon={ChatIcon} text="Чаты с сообществом" />
      <AbilityItem icon={CommunityIcon} text="Совместная отработка проектов" />
      <AbilityItem icon={HelperIcon} text="Поддержка экспертов" />
    </div>
  )
}

export default PrimeOpportunitiesContent

const AbilityItem = ({ icon: Icon, text }) => (
  <p
    className={clsx(
      styles.text_before_bonuses,
      styles.text_before_bonuses_priority,
      styles.text_before_bonuses_ability
    )}
  >
    <div className={styles.icon_wrapper}>
      <Icon className={styles.text_before_bonuses_ability_icon} />
    </div>
    {text}
  </p>
)
