import * as Dialog from "@radix-ui/react-dialog"

import { FreeSpinResponse, OpenContainerResponse } from "./types"
import CloseIcon from "./CloseIcon"

import styles from "./WinDialog.module.css"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { User } from "@/types/id-profile-user"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL

const WinDialog = ({
  open,
  onOpenChange,
  data,
  freeSpinData,
  openAuth,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: OpenContainerResponse | undefined
  freeSpinData: FreeSpinResponse | undefined
  openAuth: VoidFunction
}) => {
  const { data: profile } = useQuery({
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

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content
          className={styles.Content}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          {!data && !freeSpinData ? (
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
          ) : data ? (
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
          ) : (
            freeSpinData && (
              <>
                <div className={styles.wrapper}>
                  <div className={styles.img_container}>
                    <img src={freeSpinData.image} className={styles.img} />
                  </div>
                  <div className={styles.prize}>
                    <p className={styles.prize_title}>Поздравляем!</p>

                    <p className={styles.prize_description}>
                      Твоя мини-скидка внутри экосистемы. Она покрывает часть
                      подписки и делает вход в продукт мягче.
                    </p>
                    <p
                      className={styles.prize_description}
                      style={{ marginTop: 8 }}
                    >
                      {profile
                        ? "Чтобы активировать её, перейди по кнопке ниже в инвентарь ID и продай подарок — нажми на зелёные монетки в правом верхнем углу."
                        : "Чтобы активировать её, авторизуйся по кнопке ниже. После чего перейди в инвентарь ID и продай подарок — нажми на зелёные монетки в правом верхнем углу."}
                    </p>
                    {profile ? (
                      <a
                        className={styles.top_right}
                        href="https://id.crypton.xyz?open_tab=inventory"
                        target="_blank"
                      >
                        Продать в инвентаре
                      </a>
                    ) : (
                      <button
                        className={styles.top_right}
                        onClick={() => openAuth()}
                      >
                        Войти
                      </button>
                    )}
                  </div>
                </div>
                <Dialog.Close className={styles.close_button}>
                  <CloseIcon className={styles.close_icon} />
                </Dialog.Close>
              </>
            )
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default WinDialog
