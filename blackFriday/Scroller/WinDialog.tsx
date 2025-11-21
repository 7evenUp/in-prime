import * as Dialog from "@radix-ui/react-dialog"

// import { changeRootTab } from "@/redux/root-tabs/slice"
// import { useAppDispatch } from "@/redux/hooks"

import { OpenContainerResponse } from "./types"
import CloseIcon from "./CloseIcon"

import styles from "./WinDialog.module.css"

const WinDialog = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: OpenContainerResponse | undefined
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content
          className={styles.Content}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          {!data ? (
            <>
              <div className="flex items-center justify-center pt-10 text-3xl">
                Не удалось узнать приз
              </div>
              <Dialog.Close className={styles.close_button}>
                <CloseIcon className={styles.close_icon} />
              </Dialog.Close>
            </>
          ) : (
            <>
              <div className="w-full h-full sm:h-auto flex flex-col-reverse items-center sm:items-stretch justify-center sm:justify-start sm:flex-row gap-6 sm:gap-0 text-xs/[125%] mobile-sm:text-sm/[125%] sm:text-xs/[125%] md:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-[20px]/[125%] tracking-[0.02em]">
                <div className="flex shrink-0">
                  <img
                    src={data.prize.image!}
                    className="w-[85vw] h-[85vw] mobile-sm:w-[320px] mobile-sm:h-[320px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] 2xl:w-[360px] 2xl:h-[360px] 3xl:w-[442px] 3xl:h-[442px] object-cover sm:rounded-l-xl"
                  />
                </div>
                <div className="flex flex-col p-3 mobile-sm:py-0 mobile-sm:px-6 sm:p-4 2xl:p-6 3xl:p-8">
                  <p style={{ marginBottom: 8 }}>Поздравляем! Вы выиграли:</p>
                  <p style={{ marginBottom: 4 }}>{data.prize.title}</p>
                  <p className="max-w-[380px] sm:max-w-auto">
                    {data.prize.description}
                  </p>
                  <div className="flex items-center gap-3 mt-4 sm:mt-auto">
                    {data.prize.link ? (
                      data.prize.link === data.prize.nftImageUrl ? (
                        <a
                          href={data.prize.nftImageUrl}
                          target="_blank"
                          className={styles.link}
                        >
                          GetGems
                        </a>
                      ) : (
                        <>
                          <a
                            href={data.prize.link}
                            target="_blank"
                            className={styles.link}
                          >
                            Подробнее
                          </a>
                          <a
                            href={data.prize.nftImageUrl}
                            target="_blank"
                            className={styles.link}
                          >
                            GetGems
                          </a>
                        </>
                      )
                    ) : (
                      <a
                        href={data.prize.nftImageUrl}
                        target="_blank"
                        className={styles.link}
                      >
                        GetGems
                      </a>
                    )}
                  </div>
                  {/* <button
                    className="mt-4 sm:mt-auto text-xs flex items-center justify-center w-full font-semibold gap-2 h-8 px-6 rounded-lg bg-[#FFE19D] text-gray-1 hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.3),_0_1px_3px_1px_rgba(0,0,0,0.15)] active:shadow-none transition-all duration-100 hover:bg-[#f5d383] active:bg-[#ecc76f]"
                    onClick={goToInventory}
                  >
                    {t("Посмотреть в инвентаре")}
                  </button> */}
                </div>
              </div>
              <Dialog.Close className={styles.close_button}>
                <CloseIcon className={styles.close_icon} />
              </Dialog.Close>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default WinDialog
