import * as Dialog from "@radix-ui/react-dialog"

import styles from "./WinDialog.module.scss"

import { OpenContainerResponse } from "@/types/promo-types"
import { useAppSelector } from "@/redux/hooks"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const WinDialog = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: OpenContainerResponse | undefined
}) => {
  const { boxesLeft } = useAppSelector((state) => state.auth)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content
          className={`${styles.dialogContent} ${
            document.body.classList.contains("dark") ? "dark" : ""
          }`}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          {data === undefined ? (
            <>
              <div className={styles.errorText}>Не удалось узнать приз</div>
            </>
          ) : (
            <div>
              <h1 className={styles.prizeHeader}>
                Поздравляем! Вы получили: {data.prize.title}
              </h1>
              <div className={styles.dialogContentSuccess}>
                <div>
                  <img
                    src={data.prize.image}
                    alt="Prize"
                    className={styles.prizeImage}
                  />
                </div>
                <div className={styles.prizeDescription}>
                  <p className={styles.prizeDescription__first}>
                    Ваш подарок уже ждет вас в инвентаре Crypton ID.
                  </p>
                  <p>
                    Инструкцию по активации вы найдете{" "}
                    <a href={ID_URL} className={styles.prizeDescription__here}>
                      здесь
                    </a>
                    .
                  </p>
                </div>
              </div>
              <p className={styles.boxesLeft}>Осталось открытий: {boxesLeft}</p>

              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.buttons__close}
                  onClick={() => onOpenChange(false)}
                >
                  Продолжить открывать боксы
                </button>
                <a href={ID_URL} className={styles.buttons__id}>
                  Перейти в ID
                </a>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default WinDialog
