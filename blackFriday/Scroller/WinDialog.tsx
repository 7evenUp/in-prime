import * as Dialog from "@radix-ui/react-dialog"

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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 40,
                  fontSize: 28,
                }}
              >
                Не удалось узнать приз
              </div>
              <Dialog.Close className={styles.close_button}>
                <CloseIcon className={styles.close_icon} />
              </Dialog.Close>
            </>
          ) : (
            <>
              <div className={styles.wrapper}>
                <div className={styles.img_container}>
                  <img src={data.prize.image!} className={styles.img} />
                </div>
                <div className={styles.prize}>
                  <p style={{ marginBottom: 8 }}>Поздравляем! Вы выиграли:</p>
                  <p style={{ marginBottom: 4 }} className={styles.prize_title}>
                    {data.prize.title}
                  </p>
                  <p className={styles.prize_description}>
                    {data.prize.description}
                  </p>
                  <div className={styles.links}>
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
                          {data.prize.nftImageUrl && (
                            <a
                              href={data.prize.nftImageUrl}
                              target="_blank"
                              className={styles.link}
                            >
                              GetGems
                            </a>
                          )}
                        </>
                      )
                    ) : (
                      data.prize.nftImageUrl && (
                        <a
                          href={data.prize.nftImageUrl}
                          target="_blank"
                          className={styles.link}
                        >
                          GetGems
                        </a>
                      )
                    )}
                  </div>
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
