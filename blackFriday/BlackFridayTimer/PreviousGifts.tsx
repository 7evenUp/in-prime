import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import useEmblaCarousel from "embla-carousel-react"

import styles from "./styles.module.css"
import InfoDialog from "../Scroller/InfoDialog"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const PreviousGifts = () => {
  const { data: lastOpenedContainers } = useQuery({
    queryKey: ["last-opened-containers"],
    queryFn: async () => {
      try {
        const response = await axios.get<
          {
            openedDatetime: string
            prizeDescription: string
            prizeImageUrl: string
            prizeNftImageUrl: string
            prizeRarity: string
            prizeTitle: string
            userProfileAvatar: string
            userProfileName: string
          }[]
        >(`${ID_URL}/api/v1/crypton-events/last-opened-containers/`, {
          withCredentials: true,
        })
        return response.data
      } catch (error) {
        return null
      }
    },
    refetchInterval: 20 * 1000,
  })

  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: false,
    loop: false,
    startIndex: 0,
  })

  return (
    <>
      <p className={styles.gifts_title}>Последние подарки:</p>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.gifts}>
          {lastOpenedContainers &&
            lastOpenedContainers.length !== 0 &&
            lastOpenedContainers.map((lastOpen, i) => (
              <InfoDialog
                image={lastOpen.prizeImageUrl}
                title={lastOpen.prizeTitle}
                description={lastOpen.prizeDescription}
                getgemsLink={lastOpen.prizeNftImageUrl}
                key={i}
              >
                <div className={styles.gift}>
                  <img
                    className={styles.gift_image}
                    src={lastOpen.prizeImageUrl}
                  />
                  <div className={styles.gift_owner}>
                    <img
                      className={styles.owner_avatar}
                      src={lastOpen.userProfileAvatar}
                    />
                    <span className={styles.owner_name}>
                      {lastOpen.userProfileName}
                    </span>
                  </div>
                  <span className={styles.gift_date}>
                    {formatDistanceToNow(
                      new Date(lastOpen.openedDatetime + "+03:00"),
                      {
                        addSuffix: true,
                        locale: ru,
                      }
                    )}
                  </span>
                </div>
              </InfoDialog>
            ))}
        </div>
      </div>
    </>
  )
}

export default PreviousGifts
