import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "motion/react"
import clsx from "clsx"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"

import { generateAnimation } from "./generateAnimation"
import WinDialog from "./WinDialog"
import { Skeleton } from "./Skeleton"
import { sound } from "./sound"
import {
  ContainersResponse,
  FreeSpinResponse,
  OpenContainerResponse,
} from "./types"

import { User } from "@/types/id-profile-user"

import styles from "./styles.module.css"
import AuthDialog from "./AuthDialog"

const PRIZE_WIDTH = 136
const GAP_BETWEEN_PRIZES = 16
const PRIZE_WIDTH_WITH_GAP = PRIZE_WIDTH + GAP_BETWEEN_PRIZES
const ANIMATION_DURATION_IN_SEC = 8
const AMOUNT_OF_GENERATED_PRIZES = 50
const MIDDLE_X_POSITION = 5996

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const Scroller = () => {
  const itemPassedRef = useRef(0)
  const clickWheelSound = useRef(null)

  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)
  const [soundLoaded, setSoundLoaded] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [authOpened, setAuthOpened] = useState(false)
  const [winOpened, setWinOpened] = useState(false)
  const [isOpenLocked, setIsOpenLocked] = useState(false)

  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await axios.get<User>(
          `${ID_URL}/api/v1/users/profile/`,
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })

  const {
    data: containerData,
    isLoading,
    refetch: refetchContainers,
  } = useQuery({
    queryKey: ["containers"],
    queryFn: async () => {
      try {
        const response = await axios.get<ContainersResponse>(
          `${ID_URL}/api/v1/crypton-events/containers/`,
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })
  const {
    mutateAsync: openContainer,
    data: winData,
    isPending: isOpenLoading,
  } = useMutation({
    mutationKey: ["open-container"],
    mutationFn: async (containerId: number) => {
      try {
        const response = await axios.post<OpenContainerResponse>(
          `${ID_URL}/api/v1/crypton-events/containers/open/?containerId=${containerId}`,
          undefined,
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })
  const {
    mutateAsync: makeFreeSpin,
    data: freeSpinData,
    isPending: isFreeSpinLoading,
  } = useMutation({
    mutationKey: ["free-spin"],
    mutationFn: async () => {
      try {
        const response = await axios.post<FreeSpinResponse>(
          `${ID_URL}/api/v1/crypton-events/free-spin/`,
          undefined,
          { withCredentials: true }
        )
        return response.data
      } catch (error) {
        return null
      }
    },
  })

  const x = useMotionValue(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      clickWheelSound.current = new sound("/sounds/click_wheel.mp3")
    }
  }, [])

  useEffect(() => {
    Promise.all([clickWheelSound.current.load()]).then(() => {
      setSoundLoaded(true)
    })
  }, [])

  useMotionValueEvent(x, "change", (currentX) => {
    const itemPassed = Math.floor(Math.abs(currentX) / PRIZE_WIDTH_WITH_GAP)

    if (itemPassed === itemPassedRef.current) return

    if (soundLoaded && animationStarted) clickWheelSound.current.play()

    itemPassedRef.current = itemPassed
  })

  useMotionValueEvent(x, "animationComplete", () => {
    setAnimationStarted(false)
  })

  useEffect(() => {
    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    setWonPrizes(
      generateAnimation(
        AMOUNT_OF_GENERATED_PRIZES,
        containerData.containers[0].prizes[0].prize,
        containerData.containers[0].prizes
      )
    )

    x.set(-MIDDLE_X_POSITION)
  }, [containerData])

  const onOpenClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (isOpenLoading || isOpenLocked) return

    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    if (soundLoaded) clickWheelSound.current.play(0)

    try {
      const winResult = await openContainer(containerData.containers[0].id)

      refetchProfile()
      refetchContainers()

      setIsOpenLocked(true)

      x.jump(0)

      setWonPrizes(
        generateAnimation(
          AMOUNT_OF_GENERATED_PRIZES,
          winResult.prize,
          containerData.containers[0].prizes
        )
      )

      setAnimationStarted(true)

      animate(x, -MIDDLE_X_POSITION, {
        duration: ANIMATION_DURATION_IN_SEC,
        ease: [0, 1.01, 0.73, 1],
      })

      setTimeout(() => {
        setWinOpened(true)
        setIsOpenLocked(false)
      }, ANIMATION_DURATION_IN_SEC * 1000 + 200)
    } catch (error) {
      if (error.status === 400) {
        if (error.data.code === "not_enough_available_open_box_attempts") {
          console.log("Недостаточно ключей для лутбокса")
        } else {
          console.log("Не удалось открыть бокс")
        }
      } else if (error.status === 429) {
        console.log("Слишком много запросов. Пожалуйста, попробуйте позже")
      } else {
        console.log("Не удалось открыть бокс")
      }
    }
  }

  // const onFreeClick = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault()

  //   if (isFreeSpinLoading || isOpenLocked) return

  //   if (
  //     !containerData ||
  //     containerData.containers.length === 0 ||
  //     containerData.containers[0].prizes.length === 0
  //   )
  //     return

  //   if (soundLoaded) clickWheelSound.current.play(0)

  //   try {
  //     const winResult = await makeFreeSpin()

  //     refetchProfile()
  //     refetchContainers()

  //     setIsOpenLocked(true)

  //     x.jump(0)

  //     setWonPrizes(
  //       generateAnimation(
  //         AMOUNT_OF_GENERATED_PRIZES,
  //         {
  //           ...winResult,
  //           link: null,
  //           nftImageUrl: null,
  //           totalCountForUser: null,
  //         },
  //         containerData.containers[0].prizes
  //       )
  //     )

  //     setAnimationStarted(true)

  //     animate(x, -MIDDLE_X_POSITION, {
  //       duration: ANIMATION_DURATION_IN_SEC,
  //       ease: [0, 1.01, 0.73, 1],
  //     })

  //     setTimeout(() => {
  //       setWinOpened(true)
  //       setIsOpenLocked(false)
  //     }, ANIMATION_DURATION_IN_SEC * 1000 + 200)
  //   } catch (error) {
  //     if (error.status === 400) {
  //       if (error.data.code === "not_enough_available_open_box_attempts") {
  //         console.log("Недостаточно ключей для лутбокса")
  //       } else {
  //         console.log("Не удалось открыть бокс")
  //       }
  //     } else if (error.status === 429) {
  //       console.log("Слишком много запросов. Пожалуйста, попробуйте позже")
  //     } else {
  //       console.log("Не удалось открыть бокс")
  //     }
  //   }
  // }

  return (
    <>
      <div className={styles.top}>
        {profile && (
          <div className={styles.top_info}>
            <div className={styles.top_left}>
              <p className={styles.top_left_1}>
                Осталось открытий: {profile.promoBoxAvailableOpensNumber}
              </p>
              <p className={styles.top_left_2}>
                Использовано попыток: {profile.totalOpenedPromoBox}
              </p>
            </div>

            <a
              className={styles.top_right}
              href="https://id.crypton.xyz?open_tab=inventory"
              target="_blank"
            >
              Перейти в свой инвентарь
            </a>
          </div>
        )}

        <div className={styles.scroller_wrapper}>
          <div className={styles.scroller}>
            {isLoading ? (
              <PrizesSkeleton />
            ) : (
              <motion.div style={{ x }} className={styles.prizes}>
                {wonPrizes}
              </motion.div>
            )}
            <RoundedTriangle className={styles.triangle_top} />
            <RoundedTriangle className={styles.triangle_bottom} />
          </div>

          {isLoading ? (
            <Skeleton className={styles.button_skeleton} />
          ) : profile ? (
            <button
              className={clsx(
                styles.button,
                isOpenLocked && styles.button_animated,
                profile.promoBoxAvailableOpensNumber <= 0 &&
                  styles.button_disabled
              )}
              onClick={onOpenClick}
              disabled={
                profile.promoBoxAvailableOpensNumber <= 0 || isOpenLocked
              }
            >
              {isOpenLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.loader}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {isOpenLocked ? "Крутим-крутим..." : "Крутить рулетку"}
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => setAuthOpened(true)}
            >
              Крутить
            </button>
          )}

          {/* {isLoading ? (
            <Skeleton className={styles.button_skeleton} />
          ) : profile ? (
            profile.isFreeSpinUsed ? (
              <button
                className={clsx(
                  styles.button,
                  isOpenLocked && styles.button_animated,
                  profile.promoBoxAvailableOpensNumber <= 0 &&
                    styles.button_disabled
                )}
                onClick={onOpenClick}
                disabled={
                  profile.promoBoxAvailableOpensNumber <= 0 || isOpenLocked
                }
              >
                {isOpenLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.loader}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
                {isOpenLocked ? "Крутим-крутим..." : "Крутить рулетку"}
              </button>
            ) : (
              <button
                className={clsx(
                  styles.button,
                  isOpenLocked && styles.button_animated
                )}
                onClick={onFreeClick}
                disabled={isOpenLocked}
              >
                {isFreeSpinLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.loader}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
                {isOpenLocked ? "Крутим-крутим..." : "Бесплатный спин"}
              </button>
            )
          ) : (
            <button
              className={styles.button}
              onClick={() => setAuthOpened(true)}
            >
              Крутить
            </button>
          )} */}
        </div>
      </div>

      <WinDialog
        open={winOpened}
        onOpenChange={setWinOpened}
        data={winData}
        freeSpinData={freeSpinData}
      />

      <AuthDialog
        open={authOpened}
        onOpenChange={setAuthOpened}
        refetchCb={() => {
          refetchProfile()
          setAuthOpened(false)
        }}
      />
    </>
  )
}

export default Scroller

const RoundedTriangle = ({ className }: { className: string }) => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 28 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(styles.triangle, className)}
  >
    <path
      d="M11.4019 22.5C12.5566 24.5 15.4434 24.5 16.5981 22.5L26.9904 4.5C28.1451 2.5 26.7017 0 24.3923 0H3.60769C1.29829 0 -0.145082 2.5 1.00962 4.5L11.4019 22.5Z"
      fill="#FFE19C"
    />
  </svg>
)

const PrizesSkeleton = () => (
  <div className={styles.skeleton_container}>
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
    <Skeleton className={styles.skeleton} />
  </div>
)
