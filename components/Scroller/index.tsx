import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "motion/react"
import { toast } from "sonner"

import { generateAnimation } from "./generateAnimation"
import WinDialog from "./WinDialog"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { Sound } from "./sound"

import styles from "./generateAnimation.module.scss"
import clsx from "clsx"
import Skeleton from "./Skeleton"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { IContainers, OpenContainerResponse } from "@/types/promo-types"
import { decBoxesLeft, incBoxesUsed } from "@/redux/reducers/modalReducer"

const PRIZE_WIDTH = 136
const GAP_BETWEEN_PRIZES = 16
const PRIZE_WIDTH_WITH_GAP = PRIZE_WIDTH + GAP_BETWEEN_PRIZES
const ANIMATION_DURATION_IN_SEC = 8
const AMOUNT_OF_GENERATED_PRIZES = 50
const MIDDLE_X_POSITION = 5996

const clickWheelSound = new Sound("./audio/click_wheel.mp3")

const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"

const Scroller = () => {
  const itemPassedRef = useRef(0)

  const dispatch = useAppDispatch()

  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)
  const [soundLoaded, setSoundLoaded] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [winOpened, setWinOpened] = useState(false)

  const {
    data: containerData,
    isError: isContainersError,
    isLoading: isContainersLoading,
  } = useQuery({
    queryKey: ["containers"],
    queryFn: async () => {
      const response = await axios.get<IContainers>(
        ID_URL + "crypton-events/containers/"
      )

      return response.data
    },
  })

  const { userId } = useAppSelector((state) => state.auth)
  const {
    mutateAsync: openContainer,
    isPending: isOpenLoading,
    data: winData,
    reset,
  } = useMutation({
    mutationFn: async ({
      userId,
      containerId,
    }: {
      userId: number
      containerId: number
    }) => {
      const response = await axios.post<OpenContainerResponse>(
        `${ID_URL}crypton-events/containers/open/`,
        {},
        {
          params: {
            user_id: userId,
            containerId: containerId,
          },
          withCredentials: true,
        }
      )
      return response.data
    },
  })

  const x = useMotionValue(0)

  useEffect(() => {
    Promise.all([clickWheelSound.load()]).then(() => {
      setSoundLoaded(true)
    })
  }, [])

  useMotionValueEvent(x, "change", (currentX) => {
    const itemPassed = Math.floor(Math.abs(currentX) / PRIZE_WIDTH_WITH_GAP)

    if (itemPassed === itemPassedRef.current) return

    if (soundLoaded && animationStarted) clickWheelSound.play()

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

    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    if (soundLoaded) clickWheelSound.play(0)

    try {
      const winResult = await openContainer({
        containerId: containerData.containers[0].id,
        userId,
      })

      x.jump(0)

      setWonPrizes(
        generateAnimation(
          AMOUNT_OF_GENERATED_PRIZES,
          winResult.prize,
          containerData.containers[0].prizes
        )
      )

      dispatch(incBoxesUsed())
      dispatch(decBoxesLeft())

      setAnimationStarted(true)

      animate(x, -MIDDLE_X_POSITION, {
        duration: ANIMATION_DURATION_IN_SEC,
        ease: [0, 1.01, 0.73, 1],
      })

      setTimeout(() => {
        setWinOpened(true)
      }, ANIMATION_DURATION_IN_SEC * 1000 + 200)
    } catch (error) {
      // @ts-ignore
      if (error.status === 400) {
        // @ts-ignore
        if (error.data.code === "not_enough_available_open_box_attempts") {
          toast.error("Недостаточно ключей для лутбокса")
        } else {
          toast.error("Не удалось открыть контейнер")
        }
      } else {
        toast.error("Не удалось открыть контейнер")
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.header}>
          <span>Всего открытий боксов: {totalOpenedPromoBox}</span>
          <div className={styles.flexRow}>
            <span>
              Осталось открытий боксов: {promoBoxAvailableOpensNumber}
            </span>
            <button className="w-fit">получить больше</button>
          </div>
        </div> */}

        <div className={styles.mainContent}>
          <div className={styles.carouselWrapper}>
            {isContainersLoading ? (
              <PrizesSkeleton />
            ) : (
              <motion.div style={{ x }} className={styles.carousel}>
                {wonPrizes}
              </motion.div>
            )}
            <RoundedTriangle className={clsx(styles.triangle, styles.top)} />
            <RoundedTriangle className={clsx(styles.triangle, styles.bottom)} />
          </div>

          {isContainersLoading ? (
            // <Skeleton className="rounded-[10px] h-10 w-44" />
            <div>skeleton</div>
          ) : (
            <button className={styles.button} onClick={onOpenClick}>
              {isOpenLoading && (
                // <Loader
                //   className={clsx(
                //     "animate-spin w-3.5 h-3.5",
                //     scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
                //   )}
                // />
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
                  // class="animate-spin w-3.5 h-3.5 3xl:w-[0.911vw] 3xl:h-[0.911vw]"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
              )}
              Крутить рулетку
            </button>
          )}
        </div>
      </div>
      <WinDialog open={winOpened} onOpenChange={setWinOpened} data={winData} />
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
    className={clsx(styles.triangleIcon, className)}
  >
    <path
      d="M11.4019 22.5C12.5566 24.5 15.4434 24.5 16.5981 22.5L26.9904 4.5C28.1451 2.5 26.7017 0 24.3923 0H3.60769C1.29829 0 -0.145082 2.5 1.00962 4.5L11.4019 22.5Z"
      fill="#FFE19C"
    />
  </svg>
)

const PrizesSkeleton = () => (
  <div className="flex gap-4 w-fit ml-[50%] -translate-x-1/2">
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
  </div>
)
